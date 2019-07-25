import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const AffiliateCard = styled(Link)`
  text-decoration: none;
  color: #111;
  @media screen and (min-width:500px)
    {
      width:100%;
    }
    display: block; 
    margin: 0 auto;
    border: 1px solid rgb(235, 235, 235);
    position: relative;
  @media screen and (max-width: 400px){
    width: 100%;
  }
  &:hover{
    box-shadow: #e5e5e5 0px 3px 4px;
    transition: all .5s ease; 
  }
  @media screen and (max-width: 700px){
     &:hover{
      
    }
  }
`;

const CardInfo = styled.div`
  display: flex;
  padding: 10px;
  justify-content: space-between;
  flex-direction: column;
  background-color: #fafafa;
  min-height: 138px;
  @media screen and (max-width:1000px){
    p {
      font-size : 14px !important;
    }
  }
  p {
    margin: 5px 0;
    font-size: 18px;
    text-transform: capitalize;
    font-weight: bold;
  }

  h5{
    color: rgb(100,100,100);
    text-transform: uppercase;
    font-size: 12px;
    font-weight: 500;
    margin: 0 !important;
    margin-top: 6px;
    letter-spacing: 1px;
  }

  @media screen and (max-width: 400px){
    min-height: 126px;
    p {
      font-size: 14px;
      margin: 5px 0 5px 0;
      letter-spacing: 0;
      margin: 2px 0;
      color: black;
    }

    h5 {
      font-size: 11px;
    }
  }
`;

const LeftPart = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
`;

const BuyButton = styled(Link)`
  display: ${(props) => props.showButton === true ? "block" : "none"};
  font-size: 14px;
  border-radius: 4px; 
  background:  #41cae4;
  text-decoration: none !important;
  text-transform: uppercase;
  align-self: center;
  padding: 9px 29px;
  font-weight: 600;
  cursor: pointer;
  color: white;
  @media screen and (max-width: 400px){
    font-size: 8px;
    padding: 7px 16px;
  }
`;

const ImageCard = styled.img`
  width: 100%;
  object-fit:cover;
  height: auto;
  max-height: 180px;
  @media screen and (max-width: 400px){
    max-height: 100px;
  }
`;

const BottomPart = styled.div`
  display: flex;
  justify-content: space-between;
  #above-part {
    display: flex;
    justify-content: space-between;
    width: 40%;
  }
  @media screen and (max-width: 400px){
    margin: 9px 0 0px 0;
    #above-part {
      width: 60%;
    }
  }
`;

const Price = styled.div`
  font-size: 15px;
  font-weight: bold;
  align-self: center;
  @media screen and (max-width: 400px){
    font-size: 11px;
  }
`;

const OriginalProductValue = styled.div`
  font-weight: bold;
  font-size: 11px;
  color: ${(props) => props.myOrdersPage === true ? "black" : "grey"};
  align-self: center;
  text-decoration: ${(props) => props.myOrdersPage === true ? "none" : "line-through"};
  @media (min-width: 600px) {
    font-size: 15px;
  }
`;

class ShopCard extends Component {
  render() {
    const {
      key,
      discount,
      image,
      title,
      newPrice,
      price,
      categoryName,
      className,
      rating,
      addToCart,
      showButton,
      myOrdersPage,
    } = this.props;

    return (
      <div className={`shop-card ${className}`}>
        <AffiliateCard index={key}>
          <ImageCard className="image" src={image}></ImageCard>
          <CardInfo>
            <LeftPart>
              <h5>{categoryName}</h5>
              <p>{title}</p>
              <p>Rating: {rating}</p>
            </LeftPart>
            <BottomPart>
              <div id="above-part">
                {
                  (myOrdersPage === true) ?
                    <OriginalProductValue myOrdersPage={myOrdersPage}>INR {newPrice}</OriginalProductValue>
                    :
                    <div>
                      {discount === true && <OriginalProductValue myOrdersPage={myOrdersPage}>INR {parseInt(price)}</OriginalProductValue>}
                      {price && <Price>INR {newPrice}</Price>}
                    </div>
                }
              </div>
              <BuyButton
                showButton={showButton}
                onClick={() => addToCart({
                  title,
                  discount,
                  price,
                  categoryName,
                  image,
                  newPrice,
                  rating
                })}>
                Add to cart
                  </BuyButton>
            </BottomPart>
          </CardInfo>
        </AffiliateCard>
      </div>
    )
  }
}

export default ShopCard;