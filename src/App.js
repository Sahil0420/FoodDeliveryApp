import './App.css';
import React from 'react'
import Home from './screen/Home'
import Login from './screen/Login'
import Signup from './screen/Signup'
import YourOrders from './screen/YourOrders';
import {BrowserRouter as Router , Routes , Route } from "react-router-dom";
import { CartProvider } from './components/ContextReducer'

import '../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css'
import '../node_modules/bootstrap/dist/js/bootstrap.bundle'
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js'

function App() {
  return (
    <CartProvider>
      <Router>
          <Routes>
            <Route exact path="/" element = {<Home/>}> </Route>
            <Route exact path="/loginuser" element = {<Login/>}> </Route>
            <Route exact path="/createuser" element={<Signup/>}></Route>
            <Route exact path="/yourOrders" element={<YourOrders/>}></Route>
          </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
