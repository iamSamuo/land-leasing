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
  width: 80%;
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
  margin: 1em;
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
      crop: "",
      location: "",
      price: "",
      error: "",
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

  handleChange = (event) => {
    let name = event.target.name;
    this.setState({ [name]: event.target.value });
  };

  handleSearch = async (e) => {
    e.preventDefault();
    const landLocation = this.state.location;
    this.setState({ landLoading: true, allLand: [] });
    this.props.firebase
      .land()
      .orderByChild("location")
      .equalTo(landLocation)
      .on("value", (snapshot) => {
        const searchLandObject = snapshot.val();

        if (searchLandObject) {
          const searchLandList = Object.keys(searchLandObject).map((key) => ({
            ...searchLandObject[key],
            id: key,
          }));
          this.setState({
            allLand: searchLandList,
            landLoading: false,
          });
        } else {
          this.setState({ error: "Empty" });
        }
      });
  };

  render() {
    return (
      <MainDiv>
        <TopDiv>
          <SearchDiv>
            <SearchTitle>Search for Land</SearchTitle>
            <SearchInputs>
              <Input
                type="text"
                placeholder="crop"
                value={this.state.crop}
                name="crop"
                onChange={this.handleChange}
              ></Input>
              <Input
                type="text"
                placeholder="location"
                value={this.state.location}
                name="location"
                onChange={this.handleChange}
              ></Input>
              <Input
                type="text"
                placeholder="price"
                value={this.state.price}
                name="price"
                onChange={this.handleChange}
              ></Input>
            </SearchInputs>
            <SearchButton onClick={this.handleSearch}>Find Land</SearchButton>
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
