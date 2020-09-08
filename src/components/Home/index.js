import React from "react";
import "./index.css";
import { withAuthorization } from "../Session";

function Home() {
  return (
    <div className="main__div_products">
      <div className="title__div_products">
        <h2>Products</h2>
      </div>
      <div className="products__div">
        <div className="product">
          <div className="product_image__div"></div>
          <div className="product_content__div">
            <h3 className="product__name">Product Name</h3>
            {/* <p className="product__description">Product Description</p> */}
            <h4 className="product__price">Product Price</h4>
            <p className="merchant__contact">Contact: 0712345678</p>
          </div>
        </div>
      </div>
    </div>
  );
}

const condition = (authUser) => !!authUser;

export default withAuthorization(condition)(Home);
