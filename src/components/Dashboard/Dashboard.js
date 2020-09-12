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
  };

  handleChange = (event) => {
    let name = event.target.name;
    this.setState({ [name]: event.target.value });
  };

  // checks the upload progress.
  handleUploadStart = () =>
    this.setState({ isUploadingLand: true, landProgress: 0 });
  handleProgress = (landProgress) => this.setState({ landProgress });

  // checks for errors while uploading
  handleUploadError = (error) => {
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

    firebase.database().ref(`items/land/${this.state.landName}/`).set({
      name: landName,
      price: landPrice,
      description: landDescription,
      location: landLocation,
      suitableCrop: suitableCrop,
      image: landImageUrl,
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
            onUploadStart={this.handleUploadStart}
            onUploadError={this.handleUploadError}
            onUploadSuccess={this.handleUploadLandSuccess}
            onProgress={this.handleProgress}
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
          <button type="submit" onClick={this.handleLandUpload}>
            Upload
          </button>
        </div>
        <div className="upload__div">
          <div className="upload-title__div">
            <h2>Add Land to Listings</h2>
          </div>
          <div className="upload-description__div">
            <textarea placeholder="Brief Description of land"></textarea>
          </div>
          <div className="other-details__div">
            <input placeholder="Which crop is most suitable?"></input>
          </div>
          <div className="other-details__div">
            <input placeholder="Where is the land located?"></input>
          </div>
          <div className="other-details__div">
            <input placeholder="price of land per acre in Ksh."></input>
          </div>
        </div>
      </div>
    );
  }
}

export default withFirebase(Dashboard);
