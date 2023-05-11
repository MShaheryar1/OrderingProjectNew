import { useContext, useState } from "react";
import CartContext from "../../Store/Cart-context";
import classes from "./Cart.module.css";
import Modal from "../UI/Modal";
import CartItem from "./CartItem";
import OrderDelivered from "./OrderDelivered";
import io from "socket.io-client";

const Cart = (props) => {
  const cartCtx = useContext(CartContext);
  const [ShowOrder, setShowOrder] = useState(false);
  const totalAmount = `£${cartCtx.totalAmount.toFixed(2)}`;

  const hasItems = cartCtx.items.length > 0;
  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };
  const cartItemAddHandler = (item) => {
    cartCtx.addItem({ ...item, quantity: 1 });
  };
  const OrderHandler = async () => {
    const currentDate = new Date();
    const cartItems = cartCtx.items.map((item) => {
      return {
        name: item.name,
        prices: item.price.toFixed(2),
        amount: item.amount,
        date: currentDate.toISOString(),
        dateTime: currentDate.toISOString(),
      };
    });
    console.log(cartItems);

    try {
      const response = await fetch("http://localhost:3000/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cartItems),
        items: cartItems,
        dateTime: currentDate.toISOString(),
      });

      const responseData = await response.json();

      console.log(responseData);

      if (response.ok) {
        const socket = io("http://localhost:3000");
        socket.emit("newOrder");
        cartCtx.clearall();
        setShowOrder(true);
      } else {
        throw new Error(responseData.error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const cartItems = (
    <ul className={classes["Cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
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
      {!ShowOrder ? (
        <>
          {cartItems}
          <div className={classes.total}>
            <span>Total Amount</span>
            <span>{totalAmount}</span>
          </div>
          <div className={classes.actions}>
            <button className={classes["button--alt"]} onClick={props.onClose}>
              Close
            </button>
            {hasItems && (
              <button className={classes.button} onClick={OrderHandler}>
                Order
              </button>
            )}
          </div>
        </>
      ) : (
        <OrderDelivered onClose={props.onClose} />
      )}
    </Modal>
  );
};
export default Cart;
