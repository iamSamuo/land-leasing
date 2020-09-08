import React from "react";
import Typography from "@material-ui/core/Typography";
import "./Footer.css";

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
          <h1>Agricultural Land Lease</h1>
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
