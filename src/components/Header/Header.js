import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import * as homeActions from '../../actions/homeActions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

const HeaderDiv = styled.div`
  background: black;
  display: flex;
  padding: 8px;
  animation:  fade-in .5s ease-in;
  @keyframes  fade-in {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`;

const CenterPart = styled.div`
  display: flex;
  margin: 0 auto;
  justify-content: center;
  margin-left: 39%;

  @media screen and (max-width:1200px){
    margin-left: 37%;
  }
  @media screen and (max-width:900px){
    margin-left: 10%;
  }
  @media screen and (max-width: 500px){
    width: 100%;
    margin-left: 12%;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    margin-right: 12%;
  }
`;

const SectionHeadings = styled(Link)`
  cursor: pointer;
  @media screen and (min-width:500px){
    margin-right:25px;
    flex : 1 1 auto;
  }
  font-size: 16px;
  font-weight: 400;
  color: white;
  text-transform: capitalize;
  text-decoration: none;
  font-weight: bold;
  :hover {
    color:#e52364;
  }
`;

class Header extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }


  render() {

    return (
      <HeaderDiv id="leveloneheader">
        <CenterPart>
          <SectionHeadings to="/">Home</SectionHeadings>
          <SectionHeadings to="/my-orders">My Orders</SectionHeadings>
          <SectionHeadings to="/my-cart">My Cart</SectionHeadings>
          {/* <SectionHeadings to="/hangout"></SectionHeadings>
          <SectionHeadings to="/shop"></SectionHeadings> */}
        </CenterPart>
      </HeaderDiv>
    );
  }
}

const actions = {
  ...homeActions,
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(actions, dispatch);
}

const mapStateToProps = (state) => {
  return {
    foodItems: state.home.food_items
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));