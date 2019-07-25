import React from 'react';
import * as homeActions from '../../actions/homeActions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import { toast } from 'react-toastify';

const Wrapper = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  width: 60%;
  height: 100vh;
  justify-content: center;
  align-items: center;
  width: 100%;

  div{
    display: flex;
    flex-direction: column;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.06);
    padding: 70px;
    justify-content: center;
    align-items: center;
  }
`;

const Input = styled.input`
  font-size: .8125rem;
  font-weight: 400;
  line-height: 13px;
  line-height: .8125rem;
  background-color: #fff;
  color: #666;
  letter-spacing: .3px;
  padding: 10px;
  width: 200px;
  margin: 8px;
  border-radius: 5px;
  outline: 0px;
  border: 1px solid #eee;
`;

const Button = styled.button`
  background: #41cae4;
  padding: 10px;
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
  margin-top: 9px;
`;


class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };
  }

  handleChange = (event) => {
    const state = {...this.state};
    state[event.target.name] = event.target.value;
    this.setState(state)
  }

  login = () => {
    if(this.state.password === 'test' && this.state.username ==='test'){
      localStorage.setItem('logged_in', 'true');
      this.props.history.push('/');
    }
    else{
      toast.error("Incorrect Password");
    }
  }

  render() {
    return (
      <Wrapper>
        <div>
          <p> Login to continue </p>
          <Input value={this.state.username} name="username" onChange={this.handleChange} type="text" placeholder="Enter your email address" />
          <Input value={this.state.password} name="password" onChange={this.handleChange} type="password" placeholder="Enter your password" />
          <Button onClick={()=>this.login()}>Submit</Button>
        </div>
      </Wrapper>
    )
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
    foodItems: state.home.food_items,
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));
