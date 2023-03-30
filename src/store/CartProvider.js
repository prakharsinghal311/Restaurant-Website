import React, { useState } from "react";
import CartContext from "./cart-context";

const CartProvider = (props) => {
  const [items, setItems] = useState([]);

  const addItemToCardHandler = (item) => {
    const existingItemIndex = cartContext.items.findIndex(
      (i) => i.id === item.id
    );

    if (existingItemIndex === -1) {
      setItems([...items, item]);
    } else {
      const temp = [...items];
      temp[existingItemIndex].quantity =
        parseInt(temp[existingItemIndex].quantity) + parseInt(item.quantity);
      setItems(temp);
    }

    console.log("inside addItemToCardHandler", cartContext);
  };

  const removeItemFromCardHandler = (id) => {};

  const cartContext = {
    items: items,
    addItem: addItemToCardHandler,
    removeItem: removeItemFromCardHandler,
    message: "click here",
  };

  return (
    <CartContext.Provider value={cartContext}>
      {console.log("inside cartContext.Provider", cartContext)}
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
