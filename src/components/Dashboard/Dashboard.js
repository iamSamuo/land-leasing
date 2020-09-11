import React from "react";
import "./Dashboard.css";

function Dashboard() {
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

export default Dashboard;
