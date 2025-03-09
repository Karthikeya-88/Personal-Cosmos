import React from "react";
import CartContext from "../../context/CartContext";
import { VscClose } from "react-icons/vsc";
import "./index.css";

class CartItem extends React.Component {
  render() {
    const { cartItemDetails } = this.props;
    const { id, imageUrl, title } = cartItemDetails;

    return (
      <CartContext.Consumer>
        {(value) => {
          const { deleteCartItem } = value;

          const onDeleteCartItem = () => {
            deleteCartItem(id);
          };

          return (
            <li className="cart-list-li">
              <img src={imageUrl} alt={title} className="cart-book-img" />
              <h1 className="cart-book-name">{title}</h1>
              <h2 className="amount">Rs 450 /-</h2>
              <button
                type="button"
                className="remove-button"
                onClick={onDeleteCartItem}
              >
                <VscClose />
              </button>
            </li>
          );
        }}
      </CartContext.Consumer>
    );
  }
}

export default CartItem;
