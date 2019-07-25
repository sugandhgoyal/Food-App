import React from 'react';
import * as MyOrdersActions from '../../actions/homeActions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import ShopCard from '../../components/ShopCard/ShopCard';
import styled from 'styled-components';
import { NoDataDiv } from '../MyCart/MyCart';

const Wrapper = styled.div``;

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
  margin: 4% 2% 4% 2%;
`;

const CustomShopCard = styled(ShopCard)`
  width: 20%;
  margin-right: 3%;
  @media screen and (max-width: 728px){
    width: 45%;
  }
`;

const OrderItem = styled.div`
  border: 1px solid #eee;
  padding: 20px;
  width: 90%;
  margin: 2% auto;
  .orderId {
    margin: 1% 2%;
  }
`;


class MyOrders extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const {
      loadMyOrders,
    } = this.props;

    loadMyOrders();
  }

  render() {
    const {
      history,
    } = this.props;

    if (!localStorage.getItem('logged_in') || localStorage.getItem('logged_in') !== 'true') {
      history.push('/login');
    }
    let orderedProducts = JSON.parse(localStorage.getItem('orderedProducts')) || [];

    if (orderedProducts && orderedProducts.length === 0) {
      return (
        <NoDataDiv>
          <div>
            No orders yet!
          </div>
        </NoDataDiv>
      )
    }
    else {
      return (
        <Wrapper>
          <Heading>My Orders</Heading>

          {orderedProducts && orderedProducts.length > 0 &&
            orderedProducts.map((item, index) => (
              <OrderItem> <div className="orderId"> Order Id:<strong> {item.orderId} </strong></div>
                <div className="orderId"> Grand Total:<strong> Rs. {item.grandTotal} </strong></div>
                <div className="orderId"> Order On:<strong> {item.orderTime} </strong></div>
                <CardsWrapper>
                  {
                    item.items.map((orderedItems) => {
                      return <CustomShopCard
                        key={index}
                        discount={orderedItems.discount}
                        image={orderedItems.image}
                        title={orderedItems.title}
                        newPrice={orderedItems.newPrice}
                        price={orderedItems.price}
                        categoryName={orderedItems.category}
                        slug={orderedItems.slug}
                        rating={orderedItems.rating}
                        showButton={false}
                        myOrdersPage={true}
                      />
                    })
                  }
                </CardsWrapper>
              </OrderItem>
            ))
          }

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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MyOrders));
