import React from "react";
import "./LandDetails.css";

function LandDetails() {
  return (
    <div className="div__main">
      <div className="top__div">
        <div className="image-price__div">
          <div className="details__image__div"></div>
          <div className="details__price__div">
            <p className="details__name">Land Name</p>
            <p className="details__price">Price of Land</p>
          </div>
        </div>
        <div className="land-description__div">
          <p className="land__description">
            Land Description Land Description Land Description Land Description
            Land Description Land Description Land Description Land Description
            Land Description Land Description Land Description Land Description
            Land Description Land Description Land Description Land Description
            Land Description
          </p>
        </div>
      </div>
      <div className="land-documents__div">
        <div className="title-deed-image__div"></div>
        <div className="title-deed-image__div"></div>
        <div className="title-deed-image__div"></div>
      </div>
      <div className="land-map__div">
        <div className="map"></div>
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

export default LandDetails;
