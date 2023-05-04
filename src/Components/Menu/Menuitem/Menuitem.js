import classes from "./Menuitem.module.css";
import Menuitemform from "./Menuitemform";
import CartContext from "../../../Store/Cart-context";
import { useContext } from "react";

const Menuitem = (props) => {
  const cartCtx = useContext(CartContext);
  const price = `£${props.price.toFixed(2)}`;
  const addToCartHandler = (amount) => {
    cartCtx.addItem({
      id: props.id,
      name: props.name,
      amount: amount,
      price: props.price,
    });
  };

  return (
    <li className={classes.meal}>
      <div>
        <h3>{props.name}</h3>
        <div className={classes.description}>{props.description}</div>
        <div className={classes.price}>{price}</div>
      </div>
      <div>
        <Menuitemform id={props.id} onAddToCart={addToCartHandler} />
      </div>
    </li>
  );
};
export default Menuitem;
