import React from "react";
import Typography from "@material-ui/core/Typography";
import "./Footer.css";
import LogoImage from "../../resources/images/logo.png";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      {new Date().getFullYear()}
      Agricultural Land. All Rights Reserved
      {"."}
    </Typography>
  );
}

function Footer() {
  return (
    <div className="main-div">
      <div className="content-div">
        <div className="logo-div">
          <img src={LogoImage} alt="logo"></img>
        </div>
        <div className="contact-div">
          <h2>Contact Info</h2>
          <p>Location</p>
          <p>Phone</p>
          <p>Email</p>
        </div>
      </div>
      <div className="copyright-div">
        <Copyright />
      </div>
    </div>
  );
}

export default Footer;
