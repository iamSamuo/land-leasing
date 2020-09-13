import React, { Component } from "react";
import { withFirebase } from "../Firebase";
import "./index.css";
// import { withAuthorization } from "../Session";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      allProducts: [],
    };
  }

  componentDidMount() {
    this.setState({ loading: true });
    // fetching all available products
    this.props.firebase.products().on("value", (snapshot) => {
      const productsObject = snapshot.val();
      const productsList = Object.keys(productsObject).map((key) => ({
        ...productsObject[key],
        id: key,
      }));
      this.setState({
        allProducts: productsList,
        loading: false,
      });
    });
  }

  componentWillUnmount() {
    this.props.firebase.products().off();
  }
  render() {
    return (
      <div className="main__div_products">
        <div className="title__div_products">
          <h2>Products</h2>
        </div>
        <div className="products__div">
          {this.state.allProducts.map((product) => (
            <div className="product" key={product.id}>
              <div className="product_image__div">
                <img
                  className="product__image_"
                  src={product.image}
                  alt={product.name}
                ></img>
              </div>
              <div className="product_content__div">
                <h3 className="product__name">{product.name}</h3>
                {/* <p className="product__description">Product Description</p> */}
                <h4 className="product__price">{product.price}</h4>
                <p className="merchant__contact">Contact: {product.contact}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

// const condition = (authUser) => !!authUser;

// export default withAuthorization(condition)(Home);
export default withFirebase(Home);
