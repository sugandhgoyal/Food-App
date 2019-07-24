import React from 'react';
import * as MyOrdersActions from '../../actions/homeActions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import ShopCard from '../../components/ShopCard/ShopCard';
import styled from 'styled-components';

const Wrapper = styled.div``;

const Heading = styled.h1`
  margin: 2% 0;
  text-align: center;
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
      myOrders,
      history,
    } = this.props;
    
    if (!localStorage.getItem('logged_in') || localStorage.getItem('logged_in') !== 'true' ) {
      history.push('/login');
    }
    
    return (
      <Wrapper>
        <Heading>My Orders!</Heading>
        <CardsWrapper>
          {myOrders &&
            myOrders.map((item, index) => (
              <CustomShopCard
                key={index}
                discount={item.discount}
                image={item.image}
                title={item.name}
                newPrice={item.new_price}
                price={item.price}
                categoryName={item.category}
                slug={item.slug}
              />
            ))
          }
        </CardsWrapper>
      </Wrapper>
    )
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