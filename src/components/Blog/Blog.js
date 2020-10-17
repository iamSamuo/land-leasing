import React from "react";
import styled from "styled-components";
import LandImage from "../../resources/images/home_farmland.png";

const MainDiv = styled.div`
  padding: 1em;
  display: flex;
  flex-flow: wrap;
  align-items: flex-start;
  justify-content: space-between;
`;

const MainBlogDiv = styled.div`
  height: auto;
  width: 60%;
  display: flex;
  flex-flow: column;
  align-items: center;
  jutify-content: center;
  margin-left: 1em;
`;

const Title = styled.div`
    font-family: Helvetica;
    font-style: normal;
    font-size: 1.8em;
    font-weight; 600;
    color: #3D9A04;
`;

const BlogDiv = styled.div`
  height: auto;
  width: 100%;
  display: flex;
  flex-flow: column;
  align-items: flex-start;
  jutify-content: center;
`;

const BlogTitle = styled.h3`
  font-family: Helvetica;
  font-style: normal;
  font-size: 1.5em;
  font-weight; 500;
  color: black;
`;

const BlogImage = styled.div`
  height: ${(props) => (props.short ? "20vh" : "40vh")};
  width: ${(props) => (props.thin ? "15vw" : "50vw")};
  border: none;
  border-radius: 8px;
`;

const Image = styled.img`
  height: 100%;
  width: 100%;
`;

const BlogContentDiv = styled.div`
  margin-top: 0.5em;
  display: flex;
  flex-flow: column;
  align-items: flex-start;
  justify-content: center;
`;

const Paragraph = styled.p`
  font-family: Helvetica;
  font-style: normal;
  font-size: 1.1em;
  font-weight: 400;
  color: black;
  margin-top: 0.3em;
`;

const OtherBlogs = styled.div`
  height: auto;
  width: 35%;
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: flex-start;
  margin-top: 2.5em;
  border-left: 1px solid black;
`;

const Heading = styled.h4`
  font-family: Helvetica;
  font-style: normal;
  font-size: 1.1em;
  font-weight: 500;
  color: black;
`;

const OthersDiv = styled.div`
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
`;

const OtherBlog = styled.div`
  height: auto;
  width: 100%;
  display: flex;
  flex-flow: wrap;
  align-items: flex-start;
  justify-content: space-between;
  margin-top: 1.5em;
`;

const OtherBlogInfo = styled.div`
  height: auto;
  margin-left: 1em;
`;

function Blog() {
  return (
    <MainDiv>
      <MainBlogDiv>
        <Title>Agricultural Blog</Title>
        <BlogDiv>
          <BlogTitle>Climatic Conditions In Kenya</BlogTitle>
          <BlogImage>
            <Image src={LandImage} alt="image"></Image>
          </BlogImage>
          <BlogContentDiv>
            <Paragraph>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
              Faucibus pulvinar elementum integer enim neque. Et ligula
              ullamcorper malesuada proin libero nunc. Quam adipiscing vitae
              proin sagittis. Aliquam etiam erat velit scelerisque. Risus
              commodo viverra maecenas accumsan lacus vel facilisis volutpat
              est. In metus vulputate eu scelerisque felis imperdiet proin
              fermentum. Vestibulum lorem sed risus ultricies tristique nulla
              aliquet enim. Maecenas volutpat blandit aliquam etiam. Tortor
              pretium viverra suspendisse potenti. Diam quis enim lobortis
              scelerisque fermentum dui faucibus in ornare. Aenean sed
              adipiscing diam donec. Nunc aliquet bibendum enim facilisis
              gravida neque. Suspendisse ultrices gravida dictum fusce ut
              placerat. Cursus mattis molestie a iaculis at erat pellentesque
              adipiscing. Tellus elementum sagittis vitae et leo duis ut diam.
            </Paragraph>
            <Paragraph>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
              Faucibus pulvinar elementum integer enim neque. Et ligula
              ullamcorper malesuada proin libero nunc. Quam adipiscing vitae
              proin sagittis. Aliquam etiam erat velit scelerisque. Risus
              commodo viverra maecenas accumsan lacus vel facilisis volutpat
              est. In metus vulputate eu scelerisque felis imperdiet proin
              fermentum. Vestibulum lorem sed risus ultricies tristique nulla
              aliquet enim. Maecenas volutpat blandit aliquam etiam. Tortor
              pretium viverra suspendisse potenti. Diam quis enim lobortis
              scelerisque fermentum dui faucibus in ornare. Aenean sed
              adipiscing diam donec. Nunc aliquet bibendum enim facilisis
              gravida neque. Suspendisse ultrices gravida dictum fusce ut
              placerat. Cursus mattis molestie a iaculis at erat pellentesque
              adipiscing. Tellus elementum sagittis vitae et leo duis ut diam.
            </Paragraph>
            <Paragraph>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
              Faucibus pulvinar elementum integer enim neque. Et ligula
              ullamcorper malesuada proin libero nunc. Quam adipiscing vitae
              proin sagittis. Aliquam etiam erat velit scelerisque. Risus
              commodo viverra maecenas accumsan lacus vel facilisis volutpat
              est. In metus vulputate eu scelerisque felis imperdiet proin
              fermentum. Vestibulum lorem sed risus ultricies tristique nulla
              aliquet enim. Maecenas volutpat blandit aliquam etiam. Tortor
              pretium viverra suspendisse potenti. Diam quis enim lobortis
              scelerisque fermentum dui faucibus in ornare. Aenean sed
              adipiscing diam donec. Nunc aliquet bibendum enim facilisis
              gravida neque. Suspendisse ultrices gravida dictum fusce ut
              placerat. Cursus mattis molestie a iaculis at erat pellentesque
              adipiscing. Tellus elementum sagittis vitae et leo duis ut diam.
            </Paragraph>
          </BlogContentDiv>
        </BlogDiv>
      </MainBlogDiv>
      <OtherBlogs>
        <Heading>Related Information</Heading>
        <OthersDiv>
          <OtherBlog>
            <BlogImage short thin>
              <Image src={LandImage} alt="Land Image"></Image>
            </BlogImage>
            <OtherBlogInfo>
              <h4>Soil Types In Kenya</h4>
              <p>By A.L.L</p>
            </OtherBlogInfo>
          </OtherBlog>
          <OtherBlog>
            <BlogImage short thin>
              <Image src={LandImage} alt="Land Image"></Image>
            </BlogImage>
            <OtherBlogInfo>
              <h4>Soil Types In Kenya</h4>
              <p>By A.L.L</p>
            </OtherBlogInfo>
          </OtherBlog>
        </OthersDiv>
      </OtherBlogs>
    </MainDiv>
  );
}

export default Blog;
