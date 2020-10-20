import React, { Component } from "react";
import { withFirebase } from "../Firebase";
import { Link } from "react-router-dom";
import styled from "styled-components";
import renderIf from "render-if";

const ItemsContainer = styled.div`
  margin-top: 1.3em;
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
`;

const ItemsName = styled.h3`
  font-family: Helvetica;
  font-style: normal;
  font-weight: 700;
  font-size: 1.2em;
  color: #3d9a04;
`;

const ItemsDiv = styled.div`
  width: 80%;
  padding: 1em;
  display: flex;
  flex-flow: wrap;
  align-items: flex-start;
  justify-content: space-evenly;
`;

const Item = styled.div`
  width: 326px;
  height: 341px;
  background: #ffffff;
  border: 1px solid #e5e5e5;
  box-sizing: border-box;
  border-radius: 8px;
  margin: 1em;
`;

const ItemImageDiv = styled.div`
  height: 200px;
  width: 100%;
`;

const Image = styled.img`
  height: 100%;
  width: 100%;
  object-fit: cover;
`;

const ItemDetailsDiv = styled.div`
  height: 140px;
  width: 100%;
  padding-left: 1em;
  padding-top: 0.5em;
`;

const ItemName = styled.h3`
  font-family: Helvetica;
  font-style: normal;
  font-weight: bold;
  font-size: 1.2em;
`;

const Crops = styled.h3`
  font-family: Helvetica;
  font-style: normal;
  font-weight: 400;
  font-size: 1em;
`;

const Button = styled.button`
  font-size: 1em;
  background-color: #3d9a04;
  color: white;
  height: 1.6em;
  width: 80%;
  border: none;
  border-radius: 8px;
  cursor: pointer;
`;
class ListedHouses extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listedLand: [],
      landLoading: false,
      error: "",
    };
  }

  componentDidMount() {
    const userID = localStorage.getItem("uid");
    window.scrollTo(0, 0);
    this.setState({ landLoading: true });
    this.props.firebase
      .land()
      .orderByChild("userID")
      .equalTo(userID)
      .on("value", (snapshot) => {
        const landObject = snapshot.val();
        const landList = Object.keys(landObject).map((key) => ({
          ...landObject[key],
          id: key,
        }));
        if (landList.length !== 0) {
          this.setState({
            listedLand: landList,
            landLoading: false,
          });
        } else {
          this.setState({ error: "Empty" });
        }
        console.log(this.state.listedLand);
      });
  }
  // removing listener to prevent memory leaks
  componentWillUnmount() {
    this.props.firebase
      .land()
      .orderByChild("userID")
      .equalTo(this.props.firebase.auth.currentUser.uid)
      .off();
  }

  render() {
    return (
      <div className="listed-land-page">
        <ItemsContainer>
          <ItemsName>Land Available</ItemsName>
          {renderIf(this.state.landLoading === true)(<div>Loading...</div>)}
          {renderIf(this.state.listedLand === null)(
            <div>You have not listed any land</div>
          )}
          {renderIf(this.state.landLoading === false)(
            <ItemsDiv>
              {this.state.listedLand.map((land) => (
                <Link
                  to={`edit-land/${land.id}`}
                  style={{ textDecoration: "none", color: "black" }}
                  key={land.id}
                >
                  <Item>
                    <ItemImageDiv>
                      <Image src={land.image} alt={land.name}></Image>
                    </ItemImageDiv>
                    <ItemDetailsDiv>
                      <ItemName>{land.name}</ItemName>
                      <Crops>{land.suitableCrop}</Crops>
                      <Link
                        to={`edit-land/${land.id}`}
                        style={{ textDecoration: "none", color: "black" }}
                      >
                        <Button>Edit</Button>
                      </Link>
                    </ItemDetailsDiv>
                  </Item>
                </Link>
              ))}
            </ItemsDiv>
          )}
        </ItemsContainer>
      </div>
    );
  }
}

export default withFirebase(ListedHouses);
