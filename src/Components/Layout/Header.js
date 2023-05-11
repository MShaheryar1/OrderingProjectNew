import { Fragment, useState, useEffect } from "react";
import classes from "./Header.module.css";
import mainheaderImage from "../../Assets/burger-sandwich-header.jpg";
import CartButton from "./Cartbutton";
import io from "socket.io-client";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Header = (props) => {
  const [notifications, setNotifications] = useState([]);
  const [showNotifications] = useState(false);

  const handleOrderAccepted = (orderId) => {
    const message = `Order ${orderId} has been accepted`;
    setNotifications((prevNotifications) => [
      ...prevNotifications,
      { id: orderId, message },
    ]);
    toast.success(message);
  };

  const handleOrderRejected = (orderId) => {
    const message = `Order ${orderId} has been rejected`;
    setNotifications((prevNotifications) => [
      ...prevNotifications,
      { id: orderId, message },
    ]);
    toast.error(message);
  };

  const handleRemoveNotification = (notificationId) => {
    setNotifications((prevNotifications) =>
      prevNotifications.filter(
        (notification) => notification.id !== notificationId
      )
    );
  };

  useEffect(() => {
    const socket = io("http://localhost:3000");
    socket.on("orderAccepted", handleOrderAccepted);
    socket.on("orderRejected", handleOrderRejected);
    return () => {
      socket.off("orderAccepted", handleOrderAccepted);
      socket.off("orderRejected", handleOrderRejected);
      socket.disconnect();
    };
  }, []);

  const notificationList = notifications.map((notification) => (
    <div
      key={notification.id}
      onClick={() => handleRemoveNotification(notification.id)}
    >
      {notification.message}
    </div>
  ));

  return (
    <Fragment>
      <header className={classes.header}>
        <h1>Food Ordering App</h1>
        <div className={classes["notification-container"]}>
          {showNotifications && (
            <div className={classes["notification-list"]}>
              {notificationList}
            </div>
          )}
        </div>
        <CartButton onClick={props.onShowCart} />
      </header>
      <div className={classes["main-image"]}>
        <img src={mainheaderImage} alt="A table full of delicious food!" />
      </div>
      <ToastContainer autoClose={3000} />
    </Fragment>
  );
};

export default Header;
