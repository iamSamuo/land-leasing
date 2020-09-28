import React, { Component } from "react";
import { withFirebase } from "../Firebase";
import "./LandDetails.css";
import Map from "../Map";

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

  render() {
    return (
      <div className="div__main">
        <div className="top__div">
          <div className="image-price__div">
            <div className="details__image__div">
              <img
                className="details__image__"
                alt={this.state.landDetails.name}
                src={this.state.landDetails.image}
              ></img>
            </div>
            <div className="details__price__div">
              <p className="details__name">{this.state.landDetails.name}</p>
              <p className="details__price">{this.state.landDetails.price}</p>
            </div>
          </div>
          <div className="land-description__div">
            <p className="land__description">
              {this.state.landDetails.description}
            </p>
          </div>
        </div>
        <div className="land-documents__div">
          <div className="title-deed-image__div">
            <img
              className="details__image__"
              alt={this.state.landDetails.name}
              src={this.state.landDetails.deedImage}
            ></img>
          </div>
          <div className="title-deed-image__div">
            <img
              className="details__image__"
              alt={this.state.landDetails.name}
              src={this.state.landDetails.deedImage}
            ></img>
          </div>
        </div>
        <div className="land-map__div">
          <div className="map">
            <Map style={{ height: "100%", width: "100%" }} />
          </div>
        </div>
        <div className="options__div">
          <div className="chat__div">
            <button className="chat__button">Chat with seller</button>
            <button className="lease-agreement__button">Lease Agreement</button>
            <button className="payment__button">Proceed to Payment</button>
          </div>
        </div>
      </div>
    );
  }
}

export default withFirebase(LandDetails);
