import React, { useState } from "react";
import CartContext from "./cart-context";

const CartProvider = (props) => {
  const [items, setItems] = useState([]);

  const [totalAmount, setTotalAmount] = useState(0);

  const addItemToCardHandler = (item) => {
    const existingItemIndex = items.findIndex((i) => i.id === item.id);

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

  const calculateTotalHandler = () => {
    let total = 0;
    items.map((item) => (total += Number(item.price) * Number(item.quantity)));
    console.log(total);
    setTotalAmount(total);
  };

  const removeItemFromCardHandler = (id) => {
    const existingItemIndex = items.findIndex((i) => i.id === id);

    const existingItem = items[existingItemIndex];

    const updatedTotalAmount = totalAmount - existingItem.price;
    let updatedItems;
    if (existingItem.quantity === 1) {
      updatedItems = items.filter((item) => item.id !== id);
    } else {
      const updatedItem = {
        ...existingItem,
        quantity: Number(existingItem.quantity) - 1,
      };
      updatedItems = [...items];
      updatedItems[existingItemIndex] = updatedItem;
    }
    setTotalAmount(updatedTotalAmount);
    setItems(updatedItems);
  };

  const cartContext = {
    items: items,
    totalAmount: totalAmount,
    addItem: addItemToCardHandler,
    removeItem: removeItemFromCardHandler,
    calculateTotal: calculateTotalHandler,
    message: "click here",
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
