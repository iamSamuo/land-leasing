import React, { Component } from "react";
import { withFirebase } from "../Firebase";
import "./LandDetails.css";
import Map from "../Map";
import styled from "styled-components";

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
  margin-top: 1.5em;
`;

const Button = styled.button`
  height: 2.5em;
  width: 10em;
  background-color: #3d9a04;
  color: white;
  border: none;
  border-radius: 8px;
`;

class LandDetails extends Component {
  state = {
    landDetails: {},
    id: "",
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

  //   render() {
  //     return (
  //       <div className="div__main">
  //         <div className="top__div">
  //           <div className="image-price__div">
  //             <div className="details__image__div">
  //               <img
  //                 className="details__image__"
  //                 alt={this.state.landDetails.name}
  //                 src={this.state.landDetails.image}
  //               ></img>
  //             </div>
  //             <div className="details__price__div">
  //               <p className="details__name">{this.state.landDetails.name}</p>
  //               <p className="details__price">{this.state.landDetails.price}</p>
  //             </div>
  //           </div>
  //           <div className="land-description__div">
  //             <p className="land__description">
  //               {this.state.landDetails.description}
  //             </p>
  //           </div>
  //         </div>
  //         <div className="land-documents__div">
  //           <div className="title-deed-image__div">
  //             <img
  //               className="details__image__"
  //               alt={this.state.landDetails.name}
  //               src={this.state.landDetails.deedImage}
  //             ></img>
  //           </div>
  //           <div className="title-deed-image__div">
  //             <img
  //               className="details__image__"
  //               alt={this.state.landDetails.name}
  //               src={this.state.landDetails.deedImage}
  //             ></img>
  //           </div>
  //         </div>
  //         <div className="land-map__div">
  //           <div className="map">
  //             <Map style={{ height: "100%", width: "100%" }} />
  //           </div>
  //         </div>
  //         <div className="options__div">
  //           <div className="chat__div">
  //             <button className="chat__button">Chat with seller</button>
  //             <button className="lease-agreement__button">Lease Agreement</button>
  //             <button className="payment__button">Proceed to Payment</button>
  //           </div>
  //         </div>
  //       </div>
  //     );
  //   }
  // }

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
            <LandName>Kikuyu 50*100</LandName>
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
            <div className="map">
              <Map
                style={{ height: "100%", width: "100%", objectFit: "contain" }}
              />
            </div>
          </div>
        </MapDiv>
        <ButtonDiv>
          <Button>Chat with seller</Button>
          <Button>Lease Agreement</Button>
          <Button>Proceed To Payment</Button>
        </ButtonDiv>
      </MainDiv>
    );
  }
}
export default withFirebase(LandDetails);
