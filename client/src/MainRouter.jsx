import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";

import AddProduct from "./components/pages/AddProduct";
import EditProduct from "./components/pages/EditProduct";
import NavBar from "./components/shared/NavBar";
import ProductHome from "./components/pages/ProductHome";

export default class MainRouter extends Component {
  render() {
    return (
     <BrowserRouter>
     <div>
      <NavBar/>
      <Route path='/' exact component={ProductHome}></Route>
        <Route path='/add' exact component={AddProduct}></Route>
        <Route path='/update/:id' exact component={EditProduct}></Route>
     </div>
     </BrowserRouter>
    )
  }
}
