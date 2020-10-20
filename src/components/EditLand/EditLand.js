import React, { Component } from "react";
import { withFirebase } from "../Firebase";
import { Link } from "react-router-dom";
import styled from "styled-components";
import * as ROUTES from "../../constants/routes";

const TopDiv = styled.div`
  display: flex;
  flex-flow: row;
  align-items: flex-start;
  justify-content: space-evenly;
  width: 100%;
`;

const ProfileDiv = styled.div`
  height: 40vh;
  width: 30%;
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: flex-start;
  background-color: #e5e5e5;
  border: none;
  border-radius: 10px;
`;

const FormDiv = styled.div`
  height: auto;
  width: 50%;
`;

const InputDiv = styled.div``;

const Image = styled.img`
  height: 100%;
  width: 100%;
  object-fit: cover;
`;

const Label = styled.p`
  font-family: Helvetica;
  font-size: 1.1em;
  font-weight: 500;
  margin-bottom: -0.1em;
`;

const Input = styled.input`
  height: 2.3em;
  width: 70%;
  border: none;
  border-radius: 8px;
  background-color: #e5e5e5;
  padding-left: 0.5em;
`;

const DescInput = styled.textarea`
  height: 6em;
  width: 70%;
  border: none;
  border-radius: 8px;
  background-color: #e5e5e5;
`;
const Button = styled.button``;

const UploadButton = styled.button`
  height: 2.4em;
  width: 60%;
  color: white;
  background-color: #3d9a04;
  border: none;
  border-radius: 8px;
  margin-top: 1.5em;
  cursor: pointer;
`;

class EditLand extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      description: "",
      location: "",
      size: "",
      price: "",
      image: "",
      userID: "",
      suitableCrop: "",
      lessorName: "",
      lessorContact: "",
      expiryDate: "",
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    this.props.firebase
      .findLand(this.props.match.params.id)
      .on("value", (snapshot) => {
        var land = snapshot.val();
        console.log(`This is the data: ${land}`);
        if (land) {
          this.setState({
            key: this.props.match.params.id,
            name: land.name,
            description: land.description,
            location: land.location,
            size: land.size,
            price: land.price,
            image: land.image,
            suitableCrop: land.suitableCrop,
            userID: this.props.firebase.auth.currentUser.uid,
            lessorName: land.lessorName,
            lessorContact: land.lessorContact,
            expiryDate: land.expiryDate,
          });
        } else {
          console.log("No such Document!");
        }
      });
  }

  onChange = (e) => {
    const state = this.state;
    state[e.target.name] = e.target.value;
    this.setState(state);
  };

  onSubmit = (e) => {
    e.preventDefault();
    // const dateUploaded = Date();
    // var today = new Date();
    // var date =
    //   today.getFullYear() +
    //   "-" +
    //   (today.getMonth() + 1) +
    //   "-" +
    //   today.getDate();
    // var time =
    //   today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    // var dateUploaded = date + " " + time;

    const {
      name,
      description,
      location,
      size,
      price,
      image,
      userID,
      suitableCrop,
      lessorContact,
      lessorName,
      expiryDate,
    } = this.state;

    this.props.firebase
      .findLand(this.props.match.params.id)
      .set({
        name,
        description,
        location,
        size,
        price,
        image,
        userID,
        suitableCrop,
        lessorContact,
        lessorName,
        expiryDate,
      })
      .then((docRef) => {
        this.setState({
          name: "",
          description: "",
          location: "",
          size: "",
          price: "",
          image: "",
          suitableCrop: "",
        });
        this.props.history.push("/");
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });
  };

  deleteLand() {
    this.props.firebase.findLand(this.props.match.params.id).remove();
    this.props.history.push("/");
  }

  render() {
    return (
      <div className="container" style={{ marginTop: "90px" }}>
        <div className="panel panel-default">
          <div className="panel-heading">
            <div style={{ marginLeft: "2em", marginRight: "2em" }}>
              <Link to={ROUTES.VIEWLAND}>
                <Button>Back</Button>
              </Link>
              <Button
                className="btn btn-danger"
                onClick={this.deleteLand.bind(this, this.state.key)}
                style={{
                  float: "right",
                  color: "white",
                  backgroundColor: "red",
                  border: "none",
                  borderRadius: "8px",
                  height: "2em",
                }}
              >
                Delete House
              </Button>
            </div>
            <h2
              className="listing-heading"
              style={{ marginBottom: "5%", textAlign: "center" }}
            >
              Edit Land Details
            </h2>
          </div>
          {/* <Button onClick={this.deleteHouse()} style={{backgroundColor: "red", color: "white", marginLeft: "15em", height: "3em"}}>Delete</Button> */}

          <TopDiv>
            <ProfileDiv>
              <Image src={this.state.image}></Image>
            </ProfileDiv>
            <FormDiv>
              <InputDiv>
                <Label>Land Name</Label>
                <Input
                  type="text"
                  value={this.state.name}
                  name="name"
                  onChange={this.onChange}
                ></Input>
              </InputDiv>
              <InputDiv>
                <Label>Location</Label>
                <Input
                  type="text"
                  value={this.state.location}
                  name="location"
                  onChange={this.onChange}
                ></Input>
              </InputDiv>
              <InputDiv>
                <Label>Suitable crop</Label>
                <Input
                  type="text"
                  value={this.state.suitableCrop}
                  name="suitableCrop"
                  onChange={this.onChange}
                ></Input>
              </InputDiv>
              <InputDiv>
                <Label>Size</Label>
                <Input
                  type="text"
                  value={this.state.size}
                  name="size"
                  onChange={this.onChange}
                ></Input>
              </InputDiv>
              <InputDiv>
                <Label>Price</Label>
                <Input
                  type="text"
                  value={this.state.price}
                  name="price"
                  onChange={this.onChange}
                ></Input>
              </InputDiv>
              <InputDiv>
                <Label>Brief Description</Label>
                <DescInput
                  type="text"
                  value={this.state.description}
                  name="description"
                  onChange={this.onChange}
                ></DescInput>
              </InputDiv>
              <UploadButton type="submit" onClick={this.onSubmit}>
                Upload
              </UploadButton>
            </FormDiv>
          </TopDiv>
        </div>
      </div>
    );
  }
}

export default withFirebase(EditLand);
