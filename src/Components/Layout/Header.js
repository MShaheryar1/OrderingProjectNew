import { Fragment } from "react";
import classes from "./Header.module.css";
import mainheaderImage from "../../Assets/burger-sandwich-header.jpg";
import CartButton from "./Cartbutton";
const Header = (props) => {
  return (
    <Fragment>
      <header className={classes.header}>
        <h1>Food Ordering App</h1>
        <CartButton onClick={props.onShowCart} />
      </header>
      <div className={classes["main-image"]}>
        <img src={mainheaderImage} alt="A table full of delicious food!" />
      </div>
    </Fragment>
  );
};
export default Header;
