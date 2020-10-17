import React, { Component } from "react";
import "./Dashboard.css";
import styled from "styled-components";
import { withFirebase } from "../Firebase";
import firebase from "firebase";
import FileUploader from "react-firebase-file-uploader";
import LinearProgress from "@material-ui/core/LinearProgress";
import renderIf from "render-if";
import SignOut from "../../components/SignOut";

const MainDiv = styled.div`
  padding: 1em;
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
`;

const Title = styled.h3`
  font-family: Helvetica;
  font-style: normal;
  font-weight: bold;
  font-size: 1.5em;
  line-height: 34px;
  color: #3d9a04;
`;

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

const Name = styled.p`
  font-family: Helvetica;
  font-style: normal;
  font-size: 1.2em;
  font-weight: 300;
`;

const ActionDiv = styled.div`
  margin-top: 1em;
  width: 80%;
  height: auto;
  border-radius: 15px;
  display: flex;
  flex-flow: column;
  justify-content: center;
  margin-bottom: 1.5em;
  padding-left: 2.5em;
`;

const Link = styled.a`
  text-decoration: none;
  color: black;
  font-family: Helvetica;
  font-style: normal;
  font-size: 1.2em;
  margin-top: 0.1em;
  cursor: pointer;
  height: 1.5em;
  width: 12em;
  background-color: white;
  border-radius: 8px;
  padding-top: 0.1em;
  padding-left: 0.5em;
`;

const FormDiv = styled.div`
  height: auto;
  width: 50%;
`;

const InputDiv = styled.div``;

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

const LeaseDiv = styled.div`
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
  width: 40%;
  margin-top: 1.5em;
`;

const LeaseInputDiv = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: baseline;
  justify-content: space-between;
  width: 100%;
`;

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

class Dashboard extends Component {
  state = {
    pageLoading: false,
    landName: "",
    landPrice: "",
    landSize: "",
    landDescription: "",
    landLocation: "",
    landImageUrl: "",
    suitableCrop: "",
    landProgress: 0,
    isUploadingLand: false,
    productName: "",
    productPrice: "",
    productDescription: "",
    productImageUrl: "",
    productProgress: 0,
    merchantName: "",
    merchantContact: "",
    isUploadingProduct: false,
    userDetails: {},
    userRole: "",
    isUploading: false,
    deedProgress: 0,
  };

  componentDidMount() {
    this.setState({ pageLoading: true });
    const uid = localStorage.getItem("uid");
    this.props.firebase.user(uid).on("value", (snapshot) => {
      var user = snapshot.val();
      if (user) {
        this.setState({
          userDetails: user,
          userRole: user.role,
        });
      } else {
        console.log("No such document");
      }
    });
  }

  handleChange = (event) => {
    let name = event.target.name;
    this.setState({ [name]: event.target.value });
  };

  // checks the upload progress.
  handleUploadLandStart = () =>
    this.setState({ isUploadingLand: true, landProgress: 0 });
  handleLandProgress = (landProgress) => this.setState({ landProgress });

  // checks for errors while uploading
  handleUploadLandError = (error) => {
    this.setState({ isUploadingLand: false });
    console.error(error);
  };

  // uploads the image to firebase storage.
  handleUploadLandSuccess = (filename) => {
    this.setState({
      landImageUrl: filename,
      landProgress: 100,
      isUploadingLand: false,
    });
    this.props.firebase
      .addLandImage()
      .child(filename)
      .getDownloadURL()
      .then((url) => this.setState({ landImageUrl: url }));
  };

  // checks the upload progress.
  handleUploadTitleDeedStart = () =>
    this.setState({ isUploadingDeed: true, deedProgress: 0 });
  handleTitleDeedProgress = (deedProgress) => this.setState({ deedProgress });

  // checks for errors while uploading
  handleUploadTitleDeedError = (error) => {
    this.setState({ isUploadingDeed: false });
    console.error(error);
  };

  // uploads the image to firebase storage.
  handleUploadTitleDeedSuccess = (filename) => {
    this.setState({
      deedImageUrl: filename,
      deedProgress: 100,
      isUploadingDeed: false,
    });
    this.props.firebase
      .addLandImage()
      .child(filename)
      .getDownloadURL()
      .then((url) => this.setState({ deedImageUrl: url }));
  };

  handleLandUpload = (event) => {
    event.preventDefault();
    const {
      landName,
      landPrice,
      landSize,
      landDescription,
      landLocation,
      suitableCrop,
      landImageUrl,
      deedImageUrl,
    } = this.state;

    firebase
      .database()
      .ref(`items/land/${Math.floor(Math.random() * (10000000 - 1 + 1)) + 1}/`)
      .set({
        name: landName,
        price: landPrice,
        size: landSize,
        description: landDescription,
        location: landLocation,
        suitableCrop: suitableCrop,
        image: landImageUrl,
        deedImage: deedImageUrl,
      });
  };

  // methods to handle the product upload

  // checks the upload progress.
  handleUploadProductStart = () =>
    this.setState({ isUploadingProduct: true, productProgress: 0 });
  handleProductProgress = (productProgress) =>
    this.setState({ productProgress });

  // checks for errors while uploading
  handleUploadProductError = (error) => {
    this.setState({ isUploadingProduct: false });
    console.error(error);
  };

  // uploads the image to firebase storage.
  handleUploadProductSuccess = (filename) => {
    this.setState({
      productImageUrl: filename,
      productProgress: 100,
      isUploadingProduct: false,
    });
    this.props.firebase
      .addProductImage()
      .child(filename)
      .getDownloadURL()
      .then((url) => this.setState({ productImageUrl: url }));
  };

  handleProductUpload = (event) => {
    event.preventDefault();
    const {
      productName,
      productPrice,
      productDescription,
      productImageUrl,
      merchantName,
      merchantContact,
    } = this.state;

    firebase
      .database()
      .ref(
        `items/products/${Math.floor(Math.random() * (10000000 - 1 + 1)) + 1}/`
      )
      .set({
        name: productName,
        price: productPrice,
        description: productDescription,
        image: productImageUrl,
        merchantName: merchantName,
        contact: merchantContact,
      });
  };

  render() {
    return (
      <>
        {renderIf(this.state.userRole === "FarmOwner")(
          <MainDiv>
            <Title>Dashboard</Title>
            <TopDiv>
              <ProfileDiv>
                <Name>
                  {this.state.userDetails.firstName}{" "}
                  {this.state.userDetails.lastName}
                </Name>
                <ActionDiv>
                  <Link>Add Land</Link>
                  <Link>View Land</Link>
                  <Link>Chats</Link>
                </ActionDiv>
                <SignOut />
              </ProfileDiv>
              <FormDiv>
                <InputDiv>
                  <Label>Land Name</Label>
                  <Input
                    type="text"
                    value={this.state.landName}
                    name="landName"
                    onChange={this.handleChange}
                  ></Input>
                </InputDiv>
                <InputDiv>
                  <Label>Location</Label>
                  <Input
                    type="text"
                    value={this.state.landLocation}
                    name="landLocation"
                    onChange={this.handleChange}
                  ></Input>
                </InputDiv>
                <InputDiv>
                  <Label>Suitable crop</Label>
                  <Input
                    type="text"
                    value={this.state.suitableCrop}
                    name="suitableCrop"
                    onChange={this.handleChange}
                  ></Input>
                </InputDiv>
                <InputDiv>
                  <Label>Size</Label>
                  <Input
                    type="text"
                    value={this.state.landSize}
                    name="landSize"
                    onChange={this.handleChange}
                  ></Input>
                </InputDiv>
                <InputDiv>
                  <Label>Price</Label>
                  <Input
                    type="text"
                    value={this.state.landPrice}
                    name="landPrice"
                    onChange={this.handleChange}
                  ></Input>
                </InputDiv>
                <InputDiv>
                  <Label>Brief Description</Label>
                  <DescInput
                    type="text"
                    value={this.state.landDescription}
                    name="landDescription"
                    onChange={this.handleChange}
                  ></DescInput>
                </InputDiv>
                <InputDiv>
                  <Label>Upload Land Image</Label>
                  <FileUploader
                    accept="image/*"
                    name="landImageUrl"
                    randomizeFilename
                    storageRef={this.props.firebase.addLandImage()}
                    onUploadStart={this.handleUploadLandStart}
                    onUploadError={this.handleUploadLandError}
                    onUploadSuccess={this.handleUploadLandSuccess}
                    onProgress={this.handleLandProgress}
                  />
                </InputDiv>
                <InputDiv>
                  <Label>Upload title deed image</Label>
                  <FileUploader
                    accept="image/*"
                    name="titleDeedImageUrl"
                    randomizeFilename
                    storageRef={this.props.firebase.addLandImage()}
                    onUploadStart={this.handleUploadLandStart}
                    onUploadError={this.handleUploadTitleDeedError}
                    onUploadSuccess={this.handleUploadTitleDeedSuccess}
                    onProgress={this.handleLandProgress}
                  />
                </InputDiv>
                {this.state.isUploadingLand && (
                  <p className="progress">
                    Progress:{" "}
                    <LinearProgress
                      className=""
                      valueBuffer={this.state.landProgress}
                    />
                  </p>
                )}
              </FormDiv>
            </TopDiv>
            <LeaseDiv>
              <Title>Lease Agreement</Title>
              <LeaseInputDiv>
                <Label>Lessor Name</Label>
                <Input type="text"></Input>
              </LeaseInputDiv>
              <LeaseInputDiv>
                <Label>Size</Label>
                <Input type="text"></Input>
              </LeaseInputDiv>
              <LeaseInputDiv>
                <Label>Price</Label>
                <Input type="text"></Input>
              </LeaseInputDiv>
              <LeaseInputDiv>
                <Label>Expiry Date</Label>
                <Input type="text"></Input>
              </LeaseInputDiv>
              <LeaseInputDiv>
                <Label>Contact</Label>
                <Input type="text"></Input>
              </LeaseInputDiv>
            </LeaseDiv>
            <UploadButton type="submit" onClick={this.handleLandUpload}>
              Upload
            </UploadButton>
          </MainDiv>
        )}
        {renderIf(this.state.userRole === "vendor")(
          <MainDiv>
            <Title>Dashboard</Title>
            <TopDiv>
              <ProfileDiv>
                <Name>
                  {this.state.userDetails.firstName}{" "}
                  {this.state.userDetails.lastName}
                </Name>
                <ActionDiv>
                  <Link>Add Product/Service</Link>
                  <Link>Edit Product/Service</Link>
                </ActionDiv>
                <SignOut />
              </ProfileDiv>
              <FormDiv>
                <InputDiv>
                  <Label>Product/Service</Label>
                  <Input
                    type="text"
                    value={this.state.productName}
                    name="productName"
                    onChange={this.handleChange}
                  ></Input>
                </InputDiv>
                <InputDiv>
                  <Label>Name of Organization/Individual</Label>
                  <Input
                    type="text"
                    value={this.state.merchantName}
                    name="merchantName"
                    onChange={this.handleChange}
                  ></Input>
                </InputDiv>
                <InputDiv>
                  <Label>Price</Label>
                  <Input
                    type="text"
                    value={this.state.productPrice}
                    name="productPrice"
                    onChange={this.handleChange}
                  ></Input>
                </InputDiv>
                <InputDiv>
                  <Label>Contact</Label>
                  <Input
                    type="text"
                    value={this.state.merchantContact}
                    name="merchantContact"
                    onChange={this.handleChange}
                  ></Input>
                </InputDiv>
                <InputDiv>
                  <Label>Brief Description</Label>
                  <DescInput
                    type="text"
                    value={this.state.productDescription}
                    name="productDescription"
                    onChange={this.handleChange}
                  ></DescInput>
                </InputDiv>
                <InputDiv>
                  <Label>Upload Product Image</Label>
                  <FileUploader
                    className="file-uploader"
                    accept="image/*"
                    name="productImageUrl"
                    randomizeFilename
                    storageRef={this.props.firebase.addProductImage()}
                    onUploadStart={this.handleUploadProductStart}
                    onUploadError={this.handleUploadProductError}
                    onUploadSuccess={this.handleUploadProductSuccess}
                    onProgress={this.handleProductProgress}
                  />
                  {this.state.isUploadingProduct && (
                    <p className="progress">
                      Progress:{" "}
                      <LinearProgress
                        className=""
                        valueBuffer={this.state.productProgress}
                      />
                    </p>
                  )}
                </InputDiv>
                <UploadButton type="submit" onClick={this.handleProductUpload}>
                  Upload
                </UploadButton>
              </FormDiv>
            </TopDiv>
          </MainDiv>
        )}
      </>
    );
  }
}

export default withFirebase(Dashboard);
