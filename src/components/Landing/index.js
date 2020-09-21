import React, { Component } from "react";
import "./Landing.css";
import { Link } from "react-router-dom";
import { withFirebase } from "../Firebase";
// import * as ROUTES from "../../constants/routes";

class Landing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      allLand: [],
    };
  }

  componentDidMount() {
    this.setState({ loading: true });
    // fetching all the lands available in the database
    this.props.firebase.land().on("value", (snapshot) => {
      const landObject = snapshot.val();
      const landList = Object.keys(landObject).map((key) => ({
        ...landObject[key],
        id: key,
      }));
      this.setState({
        allLand: landList,
        loading: false,
      });
    });
  }

  componentWillUnmount() {
    this.props.firebase.land().off();
  }
  render() {
    return (
      <div className="main__div">
        <div className="title-div">
          <h2>Search For Land</h2>
        </div>
        <div className="search-div">
          <input placeholder="Grow"></input>
          <input placeholder="Location"></input>
          <input placeholder="Price"></input>
          <button>Search</button>
        </div>
        <div className="items-div">
          {this.state.allLand.map((land) => (
            <Link
              to={`land-details/${land.id}`}
              style={{ textDecoration: "none", color: "black" }}
              key={land.id}
            >
              <div className="land__div">
                <div className="image__div">
                  <img
                    className="land__image"
                    src={land.image}
                    alt={land.name}
                  ></img>
                </div>
                <div className="content__div">
                  <h4 className="land__name_">{land.name}</h4>
                  <p className="land__description_">{land.description}</p>
                  <h5 className="land__price">Ksh.{land.price} per acre</h5>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    );
  }
}

export default withFirebase(Landing);
