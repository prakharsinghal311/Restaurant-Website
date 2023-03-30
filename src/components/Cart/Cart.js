import React, { useContext } from "react";
import classes from "./Cart.module.css";
import Modal from "../UI/Modal";
import CartCntx from "../../store/cart-context";
import CartItem from "./CartItem";

const Cart = (props) => {
  const cartcntx = useContext(CartCntx);
  let totalAmount = 0;

  cartcntx.items.map(
    (item) => (totalAmount += Number(item.price) * Number(item.quantity))
  );

  const cartItemRemoveHandler = (id) => {};

  const cartItemAddHandler = (item) => {};

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartcntx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          price={item.price}
          quantity={item.quantity}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  return (
    <Modal onClose={props.onClose}>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount.toFixed(2)}</span>
      </div>
      <div className={classes.actions}>
        <button className={classes["button--alt"]} onClick={props.onClose}>
          Close
        </button>
        <button className={classes.button}>Order</button>
      </div>
    </Modal>
  );
};

export default Cart;
