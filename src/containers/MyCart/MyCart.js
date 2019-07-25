import React from 'react';
import * as MyOrdersActions from '../../actions/homeActions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import ShopCard from '../../components/ShopCard/ShopCard';
import styled from 'styled-components';

const Wrapper = styled.div`
  text-align: center;
`;

const Heading = styled.h1`
  margin: 2% 0;
  text-align: center;
  @media screen and (max-width: 728px){
    font-size: 18px;
    margin: 5% 0;
  }
`;


const CardsWrapper = styled.div`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  margin: 0 2%;
`;

const CustomShopCard = styled(ShopCard)`
  width: 29%;
  margin-right: 3%;
  @media screen and (max-width: 728px) {
    width: 40%;
  }
`;

const ConfirmOrderButton = styled.button`
  background: #46afc3;
  padding: 15px 20px;
  width: 200px;
  color: white;
  border:0;
  outline: 0;
  border-radius: 5px;
  box-sizing: content-box;
  text-transform: uppercase;
  font-weight: bold;
  letter-spacing: 1px;
  font-size: 12px;
  margin: 3%;
`;


export const NoDataDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 80vh;

  div{
    padding: 70px;
    box-shadow: 0px 0px 10px rgba(0,0,0,0.06);
  }
`;

class MyCart extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const {
      loadMyOrders,
    } = this.props;

    loadMyOrders();
  }

  placeorder = () => {
    this.props.history.push('/transaction/sucess');
  }

  render() {
    const {
      history
    } = this.props;

    let productsAddedToCart = JSON.parse(localStorage.getItem('productsAddedToCart'))

    if (!localStorage.getItem('logged_in') || localStorage.getItem('logged_in') !== 'true') {
      history.push('/login');
    }

    console.log("productsAddedToCart", productsAddedToCart);
    if (productsAddedToCart && productsAddedToCart.length === 0)
      return (
        <NoDataDiv>
          <div>
            Your cart is empty!
        </div>
        </NoDataDiv>
      )
    else {
      return (
        <Wrapper>
          <Heading>My Cart</Heading>
          <CardsWrapper>
            {productsAddedToCart && productsAddedToCart.length > 0 &&
              productsAddedToCart.map((item, index) => {
                return <CustomShopCard
                  key={index}
                  discount={item.discount}
                  image={item.image}
                  title={item.title}
                  newPrice={item.newPrice}
                  price={item.price}
                  categoryName={item.category}
                  rating={item.rating}
                  showButton={false}
                />
              })
            }
          </CardsWrapper>
          <ConfirmOrderButton onClick={this.placeorder}>Confirm and Place Order</ConfirmOrderButton>
        </Wrapper>
      )
    }
  }
}

const actions = {
  ...MyOrdersActions,
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(actions, dispatch);
}

const mapStateToProps = (state) => {
  return {
    myOrders: state.home.my_orders
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MyCart));
