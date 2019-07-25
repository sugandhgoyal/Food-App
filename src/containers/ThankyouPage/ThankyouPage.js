import React, { Component } from 'react'
import styled from 'styled-components';

const Wrapper = styled.div`
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

export default class ThankyouPage extends Component {

  render() {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    let temp = {};
    const {
      history,
    } = this.props;

    if (!localStorage.getItem('logged_in') || localStorage.getItem('logged_in') !== 'true') {
      history.push('/login');
    }

    temp.orderId = parseInt(Math.random() * 10000000);
    temp.orderTime = new Date().toLocaleDateString("en-US", options);

    temp.items = JSON.parse(localStorage.getItem('productsAddedToCart'));
    temp.grandTotal = 0;

    temp.items.forEach((item) => {
      temp.grandTotal += item.price;
    })

    if (!localStorage.getItem('orderedProducts')) {
      localStorage.setItem('orderedProducts', '[]');
      let orders = [];
      orders.push(temp);
      localStorage.setItem('orderedProducts', JSON.stringify(orders));
    }
    else {
      let orders = JSON.parse(localStorage.getItem('orderedProducts'));
      orders.push(temp);
      localStorage.setItem('orderedProducts', JSON.stringify(orders))
    }

    localStorage.setItem('productsAddedToCart', "[]");

    return (
      <Wrapper>
        <div>
          Thank you for placing order!
        </div>
      </Wrapper>
    );
  }
}

