import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Home from './containers/Home/Home';
import MyOrders from './containers/MyOrders/MyOrders'
import Header from './components/Header/Header'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MyCart from './containers/MyCart/MyCart'
import Login from './containers/Login/Login'
import ThankyouPage from './containers/ThankyouPage/ThankyouPage'

class App extends React.Component {
  render() {
    return (
      <div>
        <ToastContainer/>
        <Router>
          <Route path="*" component={Header} />
          <Route exact={true} path="/" component={Home} />
          <Route path="/my-orders" component={MyOrders} />
          <Route path="/my-cart" component={MyCart} />
          <Route path="/login" component={Login} />
          <Route path="/transaction/sucess" component={ThankyouPage} />
        </Router>
      </div>
    )
  }
}


export default App;
