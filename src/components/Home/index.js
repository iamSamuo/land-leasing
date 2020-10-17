import React, { Component } from "react";
import { withFirebase } from "../Firebase";
import "./index.css";
// import { withAuthorization } from "../Session";
import styled from "styled-components";

const MainDiv = styled.div`
  padding: 0.5em;
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
  background-color: #e5e5e5;
`;

const TopDiv = styled.div`
  width: 100%;
  height: 20vh;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #e5e5e5;
`;

const InnerDiv = styled.div`
  height: auto;
  width: 40%;
`;

const Title = styled.h2`
  font-family: Helvetica;
  font-style: normal;
  font-size: 1.3em;
  font-weight: 700;
  color: #3d9a04;
  padding-left: 2em;
`;

const SearchInput = styled.input`
  height: 2.3em;
  width: 80%;
  border: none;
  border-radius: 8px;
  background-color: white;
  padding-left: 1em;
`;

const ItemsDiv = styled.div`
  padding: 0.5em;
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const Item = styled.div`
  height: 12rem;
  width: 85%;
  display: flex;
  flex-flow: row nowrap;
  align-items: flex-start;
  justify-content: center;
  border-radius: 8px;
  background-color: white;
`;

const ItemImageDiv = styled.div`
  height: 100%;
  width: 30%;
  border-radius-left: 8px;
`;

const Image = styled.img`
  height: 100%;
  width: 100%;
  object-fit: cover;
`;

const ItemDetails = styled.div`
  height: 100%;
  width: 40%;
  padding-left: 1.5em;
`;

const ItemName = styled.h4`
  font-family: Helvetica;
  font-style: normal;
  font-size: 1.4em;
  font-weight: 400;
  color: black;
`;

const ItemProvider = styled.h5`
  font-family: Helvetica;
  font-style: italics;
  font-size: 0.8em;
  font-wight: 300;
  color: #3d9a04;
`;

const ItemDescription = styled.p`
  margin-top: 0.5em;
  font-family: Helvetica;
  font-style: italics;
  font-size: 0.8em;
  font-wight: 400;
  color: black;
`;

const ItemExtraDetails = styled.div`
  height: 100%;
  width: 30%;
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: flex-end;
`;

const ItemPrice = styled.h4`
  font-family: Helvetica;
  font-style: normal;
  font-size: 1em;
  font-weight: 600;
  color: black;
`;

const ContactButton = styled.button`
  height: 2.3em;
  width: 40%;
  background-color: #3d9a04;
  color: white;
  margin-bottom: 1.5em;
  border: none;
  border-radius: 8px;
  cursor: pointer;
`;

const MerchantContact = styled.a`
  font-family: Helvetica;
  font-style: normal;
  font-size: 0.9em;
  font-weight: 400;
  color: white;
  text-decoration: none;
`;

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
  //   render() {
  //     return (
  //       <div className="main__div_products">
  //         <div className="title__div_products">
  //           <h2>Products</h2>
  //         </div>
  //         <div className="products__div">
  //           {this.state.allProducts.map((product) => (
  //             <div className="product" key={product.id}>
  //               <div className="product_image__div">
  //                 <img
  //                   className="product__image_"
  //                   src={product.image}
  //                   alt={product.name}
  //                 ></img>
  //               </div>
  //               <div className="product_content__div">
  //                 <h3 className="product__name">{product.name}</h3>
  //                 {/* <p className="product__description">Product Description</p> */}
  //                 <h4 className="product__price">{product.price}</h4>
  //                 <p className="merchant__contact">Contact: {product.contact}</p>
  //               </div>
  //             </div>
  //           ))}
  //         </div>
  //       </div>
  //     );
  //   }
  // }

  render() {
    return (
      <MainDiv>
        <TopDiv>
          <InnerDiv>
            <Title>All Products/Services</Title>
          </InnerDiv>
          <InnerDiv>
            <SearchInput type="text" placeholder="Search"></SearchInput>
          </InnerDiv>
        </TopDiv>
        <ItemsDiv>
          {this.state.allProducts.map((product) => (
            <Item key={product.id}>
              <ItemImageDiv>
                <Image src={product.image} alt={product.name}></Image>
              </ItemImageDiv>
              <ItemDetails>
                <ItemName>{product.name}</ItemName>
                <ItemProvider>{product.merchantName}</ItemProvider>
                <ItemDescription>{product.description}</ItemDescription>
              </ItemDetails>
              <ItemExtraDetails>
                <ItemPrice>Ksh. {product.price}</ItemPrice>
                <ContactButton>
                  <MerchantContact>{product.contact}</MerchantContact>
                </ContactButton>
              </ItemExtraDetails>
            </Item>
          ))}
        </ItemsDiv>
      </MainDiv>
    );
  }
}

// const condition = (authUser) => !!authUser;

// export default withAuthorization(condition)(Home);
export default withFirebase(Home);
