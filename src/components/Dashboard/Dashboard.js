import React, { Component } from "react";
import "./Dashboard.css";
import { withFirebase } from "../Firebase";
import firebase from "firebase";
import FileUploader from "react-firebase-file-uploader";
import LinearProgress from "@material-ui/core/LinearProgress";

class Dashboard extends Component {
  state = {
    landName: "",
    landPrice: "",
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
    isUploadingProduct: false,
  };

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

  handleLandUpload = (event) => {
    event.preventDefault();
    const {
      landName,
      landPrice,
      landDescription,
      landLocation,
      suitableCrop,
      landImageUrl,
    } = this.state;

    firebase
      .database()
      .ref(`items/land/${Math.floor(Math.random() * (10000000 - 1 + 1)) + 1}/`)
      .set({
        name: landName,
        price: landPrice,
        description: landDescription,
        location: landLocation,
        suitableCrop: suitableCrop,
        image: landImageUrl,
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
      .addLandImage()
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
      });
  };
  render() {
    return (
      <div className="dashboard-main__div">
        <div className="profile__div">
          <div className="dashboard-avatar__div"></div>
          <div className="dashboard-list__div">
            <p>View products</p>
            <p>Orders</p>
            <p>Chats</p>
            <button>Logout</button>
          </div>
        </div>
        <div className="upload__div">
          <div className="upload-title__div">
            <h2>Add Land to Listings</h2>
          </div>
          <div className="upload-description__div">
            <textarea
              placeholder="Brief Description of land"
              type="text"
              value={this.state.landDescription}
              name="landDescription"
              onChange={this.handleChange}
            ></textarea>
          </div>
          <div className="other-details__div">
            <input
              placeholder="Name of land?"
              type="text"
              value={this.state.landName}
              name="landName"
              onChange={this.handleChange}
            ></input>
          </div>
          <div className="other-details__div">
            <input
              placeholder="Which crop is most suitable?"
              type="text"
              value={this.state.suitableCrop}
              name="suitableCrop"
              onChange={this.handleChange}
            ></input>
          </div>
          <div className="other-details__div">
            <input
              placeholder="Where is the land located?"
              type="text"
              value={this.state.landLocation}
              name="landLocation"
              onChange={this.handleChange}
            ></input>
          </div>
          <div className="other-details__div">
            <input
              placeholder="price of land per acre in Ksh."
              type="text"
              value={this.state.landPrice}
              name="landPrice"
              onChange={this.handleChange}
            ></input>
          </div>

          <FileUploader
            className="file-uploader"
            accept="image/*"
            name="landImageUrl"
            randomizeFilename
            storageRef={this.props.firebase.addLandImage()}
            onUploadStart={this.handleUploadLandStart}
            onUploadError={this.handleUploadLandError}
            onUploadSuccess={this.handleUploadLandSuccess}
            onProgress={this.handleLandProgress}
          />
          {this.state.isUploadingLand && (
            <p className="progress">
              Progress:{" "}
              <LinearProgress
                className=""
                valueBuffer={this.state.landProgress}
              />
            </p>
          )}
          <button
            type="submit"
            onClick={this.handleLandUpload}
            className="upload-btn"
          >
            Upload
          </button>
        </div>
        <div className="upload__div">
          <div className="upload-title__div">
            <h2>Add Product to Listings</h2>
          </div>
          <div className="upload-description__div">
            <textarea
              placeholder="Brief Description of product"
              type="text"
              value={this.state.productDescription}
              name="productDescription"
              onChange={this.handleChange}
            ></textarea>
          </div>
          <div className="other-details__div">
            <input
              placeholder="Name of product?"
              type="text"
              value={this.state.productName}
              name="productName"
              onChange={this.handleChange}
            ></input>
          </div>
          <div className="other-details__div">
            <input
              placeholder="price of product in Ksh."
              type="text"
              value={this.state.productPrice}
              name="productPrice"
              onChange={this.handleChange}
            ></input>
          </div>
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
          <button
            type="submit"
            onClick={this.handleProductUpload}
            className="upload-btn"
          >
            Upload
          </button>
        </div>
      </div>
    );
  }
}

export default withFirebase(Dashboard);
