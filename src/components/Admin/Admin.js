import React, { Component } from "react";
import styled from "styled-components";
import { withFirebase } from "../Firebase";
import { withAuthorization } from "../Session";
import renderIf from "render-if";

const MainDiv = styled.div`
  padding: 2em;
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
`;

const Title = styled.h3`
  font-family: Helvetica;
  font-style: normal;
  font-weight: 700;
  font-size: 1.2em;
  color: #3d9a04;
`;

const Table = styled.table`
  height: auto;
  width: 80%;
`;

class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allPayments: [],
      loading: false,
    };
  }

  componentDidMount() {
    this.setState({ loading: true });
    this.props.firebase.payments().on("value", (snapshot) => {
      const paymentsObject = snapshot.val();
      const paymentsList = Object.keys(paymentsObject).map((key) => ({
        ...paymentsObject[key],
        id: key,
      }));
      this.setState({
        allPayments: paymentsList,
        loading: false,
      });
    });
  }

  componentWillUnmount() {
    this.props.firebase.payments().off();
  }
  render() {
    return (
      <MainDiv>
        <Title>Admin Page</Title>
        {renderIf(this.state.loading === true)(<div>Loading...</div>)}
        {renderIf(this.state.loading === false)(
          <Table>
            <tr>
              <th>Lessor Name</th>
              <th>Amount</th>
              <th>Mpesa Code</th>
              <th>Date Paid</th>
            </tr>
            {this.state.allPayments.map((payment) => {
              return (
                <tr>
                  <td style={{ textAlign: "center" }}>{payment.lessorName}</td>
                  <td style={{ textAlign: "center" }}>{payment.amount}</td>
                  <td style={{ textAlign: "center" }}>{payment.mpesaCode}</td>
                  <td style={{ textAlign: "center" }}>{payment.datePaid}</td>
                </tr>
              );
            })}
          </Table>
        )}
      </MainDiv>
    );
  }
}

const condition = (authUser) =>
  authUser && authUser.email === "kibuika@gmail.com";
export default withAuthorization(condition)(withFirebase(Admin));
