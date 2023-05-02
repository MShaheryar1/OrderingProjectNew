import "./App.css";
import Header from "./Components/Layout/Header";
import Menu2 from "./Components/Menu/Menu2";
import CartProvider from "./Store/CartProvider";
import Cart from "./Components/Cart/Cart";
import React, { useState } from "react";
function App() {
  const [cartIsShown, setCartIsShown] = useState(false);
  const showCartHandler = () => {
    setCartIsShown(true);
  };
  const hideCartHandler = () => {
    setCartIsShown(false);
  };

  return (
    <CartProvider>
      {cartIsShown && <Cart onClose={hideCartHandler} />}
      <Header onShowCart={showCartHandler} />;
      <main>
        <Menu2 />
      </main>
    </CartProvider>
  );
}

export default App;
