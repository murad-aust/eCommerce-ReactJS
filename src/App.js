import React from 'react';
import './App.css';
import Header from './components/Header/Header';
import Shop from './components/Shop/Shop';
import Review from './components/Review/Review';
import Manage from './components/Manage/Manage';
import NotFound from './components/NotFound/NotFound';

import {
  BrowserRouter as Router,
  Switch,
  Route,

} from "react-router-dom";
import ProductDetail from './components/ProductDetail/ProductDetail';
import Login from './components/Login/Login';
import { createContext } from 'react';
import { useState } from 'react';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import Shipment from './components/Shipment/Shipment';
import Inventory from './components/Inventory/Inventory';

export const UserContext = createContext();

function App() {
  const [loggedInUser, setLoggedInUser] = useState({});

  return (
    <UserContext.Provider value = {[loggedInUser,  setLoggedInUser]}>
      
      
      <Router>
          <Header></Header>
            <Switch>
             
              <Route path="/shop">
              <Shop></Shop>
              </Route>
              <Route path="/review">
                <Review></Review>
              </Route>
              <Route path="/manage">
                <Manage></Manage>
              </Route>
              <Route exact path="/">
              <Shop></Shop>
              </Route>
              <PrivateRoute path="/inventory">
                <Inventory></Inventory>
              </PrivateRoute>
              <Route path="/login">
                <Login></Login>
              </Route>
              <PrivateRoute  path="/shipment">
                <Shipment></Shipment>
              </PrivateRoute >
              <Route path="/product/:productkey">
                <ProductDetail></ProductDetail>
              </Route>
              <Route path="*">
                <NotFound></NotFound>
              </Route>
            </Switch>
      </Router>

        
    
    </UserContext.Provider>
  );
}

export default App;
