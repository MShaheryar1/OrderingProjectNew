import { useContext, useState } from "react";
import CartContext from "../../Store/Cart-context";
import classes from "./Cart.module.css";
import Modal from "../UI/Modal";
import CartItem from "./CartItem";
import OrderDelivered from "./OrderDelivered";

const Cart = (props) => {
  const cartCtx = useContext(CartContext);
  const [ShowOrder, setShowOrder] = useState(false);
  const totalAmount = `£${cartCtx.totalAmount.toFixed(2)}`;

  const hasItems = cartCtx.items.length > 0;
  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };
  const cartItemAddHandler = (item) => {
    cartCtx.addItem({ ...item, item: 1 });
  };
  const OrderHandler = () => {
    cartCtx.clearall();
    setShowOrder(true);
  };

  const cartItems = (
    <ul className={classes["Cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
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
