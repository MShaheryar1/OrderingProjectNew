import "./App.css";
import Header from "./Components/Layout/Header";
import Menu2 from "./Components/Menu/Menu2";
import CartProvider from "./Store/CartProvider";
import Cart from "./Components/Cart/Cart";
import React, { useState } from "react";
import Login from "./Components/UserManagment/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./Components/UserManagment/Signup";
function App() {
  const [cartIsShown, setCartIsShown] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const showCartHandler = () => {
    setCartIsShown(true);
  };

  const hideCartHandler = () => {
    setCartIsShown(false);
  };

  const authenticateHandler = () => {
    setIsAuthenticated(true);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={<Login onAuthenticate={authenticateHandler} />}
        />
        <Route
          path="/signup"
          element={<Signup onAuthenticate={authenticateHandler} />}
        />
        {isAuthenticated ? (
          <Route path="/" element={<Menu2 />} />
        ) : (
          <Route
            path="/"
            element={<Login onAuthenticate={authenticateHandler} />}
          />
        )}
      </Routes>
      <CartProvider>
        {cartIsShown && <Cart onClose={hideCartHandler} />}
        {isAuthenticated && <Header onShowCart={showCartHandler} />}
        <main>
          {isAuthenticated ? (
            <Menu2 />
          ) : (
            <Login onAuthenticate={authenticateHandler} />
          )}
        </main>
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;
