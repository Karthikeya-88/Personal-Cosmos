import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../Header";
import Popup from "reactjs-popup";
import CartContext from "../../context/CartContext";

import CartListView from "../CartListView";
import "./index.css";

const Cart = () => {
  const [showMessage] = useState(true);

  return (
    <CartContext.Consumer>
      {(value) => {
        const { cartList } = value;
        const showOrderView = cartList.length === 0;

        return (
          <>
            <Header />
            {showOrderView ? (
              <div className="empty-carriage">
                <h3 className="empty-cart-header">
                  Add a novel to your Cartlist
                </h3>
                <img
                  src="https://cdni.iconscout.com/illustration/premium/thumb/empty-cart-3428210-2902552.png"
                  alt="empty cart"
                  className="empty-cart-img"
                />
                <Link to="/books" className="place-an-order-link">
                  <button className="place-an-order-btn">Place an Order</button>
                </Link>
              </div>
            ) : (
              <div className="cart-list-container">
                <h1 style={{ fontSize: "28px" }}>My Books</h1>
                <CartListView />
                <h1 className="order-total-amount">
                  Your Order Total: {cartList.length * 450} /-
                </h1>
                <Popup
                  modal
                  trigger={
                    <button type="button" className="order-placed-button">
                      Confirm Order
                    </button>
                  }
                >
                  {showMessage && (
                    <div className="order-placed-container">
                      <p>
                        Thanks for shopping with us! <br />
                        Your support is very much appreciated
                      </p>
                    </div>
                  )}
                </Popup>
              </div>
            )}
          </>
        );
      }}
    </CartContext.Consumer>
  );
};

export default Cart;
