import React, { Component } from "react";
import "./Landing.css";
import { Link } from "react-router-dom";
import { withFirebase } from "../Firebase";
// import * as ROUTES from "../../constants/routes";
import styled from "styled-components";
import HomeImage from "../../resources/images/home_farmland.png";
import renderIf from "render-if";

const MainDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TopDiv = styled.div`
  height: 60vh;
  width: 100%;
  background-color: black;
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: url(${HomeImage});
  background-size: cover;
  background-repeat: no-repeat;
`;

const SearchDiv = styled.div`
  position: absolute;
  width: 60vw;
  height: auto;
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
`;

const SearchTitle = styled.h3`
  font-family: Helvetica;
  font-weight: 700;
  font-style: normal;
  font-size: 2em;
  line-height: 41.4px;
  color: white;
`;

const SearchInputs = styled.div`
  display: flex;
  flex-flow: wrap;
  align-items: center;
  justify-content: space-evenly;
  width: 80%;
`;

const Input = styled.input`
  height: 2.5em;
  width: 11em;
  border-radius: 8px;
  border: none;
  padding-left: 1em;
  margin: 0.4em;

  :focus {
    border: none;
  }
`;

const SearchButton = styled.button`
  height: 2.5em;
  width: 40%;
  background-color: #3d9a04;
  color: white;
  border-radius: 8px;
  margin-top: 1.5em;
  border: none;
  cursor: pointer;
`;

const ItemsContainer = styled.div`
  margin-top: 1.3em;
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
`;

const ItemsName = styled.h3`
  font-family: Helvetica;
  font-style: normal;
  font-weight: 700;
  font-size: 1.2em;
  color: #3d9a04;
`;

const ItemsDiv = styled.div`
  width: 100%;
  padding: 1em;
  display: flex;
  flex-flow: wrap;
  align-items: flex-start;
  justify-content: space-evenly;
`;

const Item = styled.div`
  width: 326px;
  height: 341px;
  background: #ffffff;
  border: 1px solid #e5e5e5;
  box-sizing: border-box;
  border-radius: 8px;
`;

const ItemImageDiv = styled.div`
  height: 200px;
  width: 100%;
`;

const Image = styled.img`
  height: 100%;
  width: 100%;
  object-fit: cover;
`;

const ItemDetailsDiv = styled.div`
  height: 140px;
  width: 100%;
  padding-left: 1em;
  padding-top: 0.5em;
`;

const ItemName = styled.h3`
  font-family: Helvetica;
  font-style: normal;
  font-weight: bold;
  font-size: 1.2em;
`;

const Crops = styled.h3`
  font-family: Helvetica;
  font-style: normal;
  font-weight: 400;
  font-size: 1em;
`;

const Price = styled.h3`
  font-family: Helvetica;
  font-style: normal;
  font-weight: bold;
  font-size: 1.3em;
  color: #3d9a04;
`;
class Landing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      landLoading: false,
      allLand: [],
      productsLoading: false,
      allProducts: [],
    };
  }

  componentDidMount() {
    this.setState({ landLoading: true });
    // fetching all the lands available in the database
    this.props.firebase.land().on("value", (snapshot) => {
      const landObject = snapshot.val();
      const landList = Object.keys(landObject).map((key) => ({
        ...landObject[key],
        id: key,
      }));
      this.setState({
        allLand: landList,
        landLoading: false,
      });
    });

    this.setState({ productsLoading: true });
    // fetching all available products
    this.props.firebase.products().on("value", (snapshot) => {
      const productsObject = snapshot.val();
      const productsList = Object.keys(productsObject).map((key) => ({
        ...productsObject[key],
        id: key,
      }));
      this.setState({
        allProducts: productsList,
        productsLoading: false,
      });
      this.setState({
        productsLoading: false,
      });
    });
  }

  componentWillUnmount() {
    this.props.firebase.land().off();
    this.props.firebase.products().off();
  }
  //   render() {
  //     return (
  //       <div className="main__div">
  //         <div className="title-div">
  //           <h2>Search For Land</h2>
  //         </div>
  //         <div className="search-div">
  //           <input placeholder="Grow"></input>
  //           <input placeholder="Location"></input>
  //           <input placeholder="Price"></input>
  //           <button>Search</button>
  //         </div>
  //         <div className="items-div">
  //           {this.state.allLand.map((land) => (
  //             <Link
  //               to={`land-details/${land.id}`}
  //               style={{ textDecoration: "none", color: "black" }}
  //               key={land.id}
  //             >
  //               <div className="land__div">
  //                 <div className="image__div">
  //                   <img
  //                     className="land__image"
  //                     src={land.image}
  //                     alt={land.name}
  //                   ></img>
  //                 </div>
  //                 <div className="content__div">
  //                   <h4 className="land__name_">{land.name}</h4>
  //                   <p className="land__description_">{land.description}</p>
  //                   <h5 className="land__price">Ksh.{land.price} per acre</h5>
  //                 </div>
  //               </div>
  //             </Link>
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
          <SearchDiv>
            <SearchTitle>Search for Land</SearchTitle>
            <SearchInputs>
              <Input type="text" placeholder="crop"></Input>
              <Input type="text" placeholder="location"></Input>
              <Input type="text" placeholder="price"></Input>
            </SearchInputs>
            <SearchButton>Find Land</SearchButton>
          </SearchDiv>
        </TopDiv>
        <ItemsContainer>
          <ItemsName>Land Available</ItemsName>
          {renderIf(this.state.landLoading === true)(<div>Loading...</div>)}
          {renderIf(this.state.landLoading === false)(
            <ItemsDiv>
              {this.state.allLand.map((land) => (
                <Link
                  to={`land-details/${land.id}`}
                  style={{ textDecoration: "none", color: "black" }}
                  key={land.id}
                >
                  <Item>
                    <ItemImageDiv>
                      <Image src={land.image} alt={land.name}></Image>
                    </ItemImageDiv>
                    <ItemDetailsDiv>
                      <ItemName>{land.name}</ItemName>
                      <Crops>{land.suitableCrop}</Crops>
                      <Price>Ksh. {land.price}</Price>
                    </ItemDetailsDiv>
                  </Item>
                </Link>
              ))}
            </ItemsDiv>
          )}
        </ItemsContainer>
        <ItemsContainer>
          <ItemsName>Products Available</ItemsName>
          {renderIf(this.state.productsLoading === true)(<div>Loading...</div>)}
          {renderIf(this.state.productsLoading === false)(
            <ItemsDiv>
              {this.state.allProducts.map((product) => (
                <Item key={product.id}>
                  <ItemImageDiv>
                    <Image src={product.image} alt={product.name}></Image>
                  </ItemImageDiv>
                  <ItemDetailsDiv>
                    <ItemName>{product.name}</ItemName>
                    <Crops>{product.merchantName}</Crops>
                    <Price>Ksh. {product.price}</Price>
                  </ItemDetailsDiv>
                </Item>
              ))}
            </ItemsDiv>
          )}
        </ItemsContainer>
      </MainDiv>
    );
  }
}

export default withFirebase(Landing);
