import Input from "../../UI/Input";
import classes from "./Menuitemform.module.css";
import { useState, useRef } from "react";
const Menuitemform = (props) => {
  const [amountValid, setAmountValid] = useState(true);
  const amountInputRef = useRef();
  const submitHandler = (event) => {
    event.preventDefault();

    const enteredAmount = amountInputRef.current.value;
    const enteredAmountNumber = +enteredAmount;

    if (
      enteredAmount.trim().length === 0 ||
      enteredAmountNumber < 1 ||
      enteredAmountNumber > 10
    ) {
      setAmountValid(false);
      return;
    }
    props.onAddToCart(enteredAmountNumber);
    amountInputRef.current.value = "0";
  };
  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <Input
        ref={amountInputRef}
        label="Amount"
        input={{
          id: "amount_" + props.id,
          type: "number",
          min: "1",
          max: "10",
          step: "1",
          defaultValue: "0",
        }}
      />

      <button>+ Add</button>
      {!amountValid && <p> Enter a Valid amount(1-10).</p>}
    </form>
  );
};
export default Menuitemform;
