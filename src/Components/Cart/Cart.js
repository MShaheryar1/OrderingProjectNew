import { useContext, useState } from "react";
import CartContext from "../../Store/Cart-context";
import classes from "./Cart.module.css";
import Modal from "../UI/Modal";
import CartItem from "./CartItem";
import OrderDelivered from "./OrderDelivered";
import io from "socket.io-client";

const Cart = (props) => {
  // Get the cart context and order status from the state
  const cartCtx = useContext(CartContext);
  const [ShowOrder, setShowOrder] = useState(false);
  // Calculate the total amount of the items in the cart
  const totalAmount = `£${cartCtx.totalAmount.toFixed(2)}`;

  // Check if there are items in the cart
  const hasItems = cartCtx.items.length > 0;

  // Remove an item from the cart
  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  // Add an item to the cart
  const cartItemAddHandler = (item) => {
    cartCtx.addItem({ ...item, quantity: 1 });
  };

  // Handle the order placement
  const OrderHandler = async () => {
    // Get the current date
    const currentDate = new Date();
    // Map the items in the cart to the format required by the server
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
      // Send the order data to the server
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

      // If the order was successful, emit a signal to the server and clear the cart
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

  // Generate a list of cart items
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

  // Render the cart component
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
