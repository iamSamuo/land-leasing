import React, { Component } from "react";
import { withFirebase } from "../Firebase";
import "./LandDetails.css";
// import Map from "../Map";
import styled from "styled-components";
import ReactModal from "react-modal";
import { Link } from "react-router-dom";

const MainDiv = styled.div`
  padding: 1.5em;
  height: auto;
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
`;

const Title = styled.h2`
  font-family: Helvetica;
  font-style: normal;
  font-size: 1.3em;
  font-weight: 700;
  color: #3d9a04;
`;

const TopDiv = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: flex-start;
  justify-content: space-between;
  height: auto;
  width: 100%;
`;

const ImageContainer = styled.div`
  height: auto;
  width: 60%;
`;

const ImageDiv = styled.div`
  height: 50vh;
  width: 50vw;
`;

const Image = styled.img`
  height: 100%;
  width: 100%;
  object-fit: cover;
`;

const LandName = styled.h4`
  font-family: Helvetica;
  font-style: normal;
  font-weight: 400;
  font-size: 1.1em;
  color: black;
`;

const LandDetail = styled.div`
  display: flex;
  flex-flow: column;
  align-items: flex-start;
  justify-content: center;
  width: 40%;
`;

const Detail = styled.div`
  width: 80%;
  display: flex;
  align-items: baseline;
  justify-content: space-between;
`;

const Option = styled.h3`
  font-family: Helvetica;
  font-style: normal;
  font-weight: 400;
  font-size: 1.1em;
`;

const Value = styled.h3`
  font-family: Helvetica;
  font-style; normal;
  font-weight: 600;
  font-size: 1.2em;
`;

const CertificateDiv = styled.div`
  width: 100%;
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
`;

const CertificateImages = styled.div`
  width: 80%;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: center;
`;

const CertImage = styled.div`
  height: 15em;
  width: 15em;
  border: none;
  border-radius: 8px;
`;

const MapDiv = styled.div`
display: none;
  height: auto;
  width: 80%;
  display: flex;
  flex-flow: column;
  align-items center;
  justify-content: center;
`;

const ButtonDiv = styled.div`
  width: 80%;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: space-between;
  margin-top: 2.5em;
`;

const Button = styled.button`
  height: 2.5em;
  width: 10em;
  background-color: #3d9a04;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
`;

class LandDetails extends Component {
  state = {
    landDetails: {},
    id: "",
    showModal: false,
  };

  componentDidMount(id) {
    window.scrollTo(0, 0);
    this.props.firebase
      .findLand(this.props.match.params.id)
      .on("value", (snapshot) => {
        var land = snapshot.val();
        if (land) {
          this.setState({
            landDetails: land,
            id: this.props.match.params.id,
          });
        } else {
          console.log("No such land");
        }
      });
  }

  handleOpenModal = () => {
    this.setState({ showModal: true });
  };

  handleCloseModal = () => {
    this.setState({ showModal: false });
  };

  render() {
    return (
      <MainDiv>
        <Title>Land Description</Title>
        <TopDiv>
          <ImageContainer>
            <ImageDiv>
              <Image
                src={this.state.landDetails.image}
                alt={this.state.landDetails.name}
              ></Image>
            </ImageDiv>
            <LandName>
              {this.state.landDetails.name} {this.state.landDetails.size}
            </LandName>
          </ImageContainer>
          <LandDetail>
            <Detail>
              <Option>Location : </Option>
              <Value>{this.state.landDetails.location}</Value>
            </Detail>
            <Detail>
              <Option>Size : </Option>
              <Value>{this.state.landDetails.size}</Value>
            </Detail>
            <Detail>
              <Option>Price : </Option>
              <Value>{this.state.landDetails.price}</Value>
            </Detail>
            <Detail>
              <Option>Brief Description : </Option>
              <Value>{this.state.landDetails.description}</Value>
            </Detail>
          </LandDetail>
        </TopDiv>
        <CertificateDiv>
          <Title>Images of Certificates</Title>
          <CertificateImages>
            <CertImage>
              <Image
                src={this.state.landDetails.deedImage}
                alt={this.state.landDetails.name}
              ></Image>
            </CertImage>
          </CertificateImages>
        </CertificateDiv>
        <MapDiv>
          <Title>Location</Title>
          <div className="land-map__div">
            <div className="map">{/* <Map /> */}</div>
            <p>Map</p>
          </div>
        </MapDiv>
        <ButtonDiv>
          <Button onClick={this.handleOpenModal}>Lease Agreement</Button>
          <Button>Chat with Seller</Button>
          <Link to="/payments">
            <Button>Proceed To Payment</Button>
          </Link>
          <ReactModal
            isOpen={this.state.showModal}
            contentLabel="Minimal Modal Example"
          >
            <p>
              This agreement is between ${this.state.landDetails.lessorName} (
              landowner) and _________________, (tenant), for the lease of
              certain parcels of land for the purpose of Agricultural practice
              (Farming )
            </p>
            <p>
              1.The parcel(s) contained in this agreement are is/described as
              follows: location, Size.
            </p>
            <p>
              2. The term of this lease shall be Expire from $
              {this.state.landDetails.expiryDate}
              except as terminated earlier according to the provisions below.{" "}
            </p>

            <p>
              3. The tenant agrees to pay a lease fee to the landowner of Ksh. $
              {this.state.landDetails.price} per ${this.state.landDetails.size}.
              The tenant agrees to pay such sum at the beginning of the lease
              term and on the anniversary thereof unless otherwise mutually
              agreed. This lease fee may be renegotiated annually.
            </p>

            <p>
              4. Permitted Uses: The tenant is permitted all normal activities
              associated with the above purposes, including but not limited to:
              The tenant agrees to employ standard best management practices. It
              shall not be considered a default of this Lease if weather or
              other circumstance prevents timely practices or harvesting.{" "}
            </p>

            <p>
              5. Prohibited Uses: The tenant shall not, unless by mutual
              agreement to the contrary, engage in any of the following
              activities on said parcel(s):{" "}
            </p>
            <p>
              6. The tenant agrees to prepare an annual management plan for
              review by the landlord, complete annual soil testing, and apply
              amendments as indicated at his/her own expense. The tenant agrees
              to proper disposal of trash and waste. The tenant further agrees:{" "}
            </p>
            <p>
              7. The [landowner/tenant] agrees to pay all taxes and assessments
              associated with this parcel.{" "}
            </p>
            <p>
              8. The farmer agrees to provide the landowner with evidence of
              liability insurance coverage.{" "}
            </p>
            <p>
              9. Either party may terminate this lease at any time with 3 month
              notice to the other party. The tenant agrees not to assign or
              sublease his/her interest.{" "}
            </p>
            <p>
              10. The terms of this lease may be amended by mutual consent.{" "}
            </p>
            <p>
              11. A default in any of these provisions by either party may be
              cured upon written notice by the other party within 30 days of
              receipt of such notice. Any disputes occurring from this lease may
              be resolved by standard mediation practices, if necessary.{" "}
            </p>
            <p>
              12. Landowner retains his/her right to access the parcel(s) for
              the purposes of inspection with prior notification to the tenant.
            </p>
            <Button onClick={this.handleCloseModal}>Close Agreement</Button>
          </ReactModal>
        </ButtonDiv>
      </MainDiv>
    );
  }
}
export default withFirebase(LandDetails);
