import React, { createContext, useState, useEffect } from "react";

const CartContext = createContext({
  cartList: [],
  addCartItem: () => {},
  deleteCartItem: () => {},
});

export const CartProvider = ({ children }) => {
  const initialCart = JSON.parse(localStorage.getItem("cart")) || [];
  const [cartList, setCartList] = useState(initialCart);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartList));
  }, [cartList]);

  const addCartItem = (item) => {
    setCartList((prevCart) => {
      const bookObject = prevCart.find((eachItem) => eachItem.id === item.id);

      if (bookObject) {
        return prevCart.map((eachItem) => {
          if (bookObject.id === eachItem.id) {
            const updatedQuantity = eachItem.quantity + item.quantity;
            return { ...eachItem, quantity: updatedQuantity };
          }
          return eachItem;
        });
      } else {
        const newCart = [...prevCart, item];

        if (newCart.length > 8) {
          newCart.splice(0, newCart.length - 8);
        }
        return newCart;
      }
    });
  };

  const deleteCartItem = (id) => {
    setCartList((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  return (
    <CartContext.Provider
      value={{
        cartList,
        addCartItem,
        deleteCartItem,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
