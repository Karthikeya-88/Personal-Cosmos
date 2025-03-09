import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { CartProvider } from "./context/CartContext"; // Import CartProvider
import "./App.css";

import About from "./components/About";
import Home from "./components/Home";
import Books from "./components/Books";
import Cart from "./components/Cart";
import NotFound from "./components/NotFound";
import BookDetails from "./components/BookDetails";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <CartProvider>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/books" exact component={Books} />
            <Route path="/about" exact component={About} />
            <Route path="/cart" exact component={Cart} />
            <Route path="/books/:id" component={BookDetails} />
            <Route path="*" component={NotFound} />
          </Switch>
        </CartProvider>
      </BrowserRouter>
    );
  }
}

export default App;
