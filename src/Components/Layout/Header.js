import { Fragment, useState, useEffect } from "react";
import classes from "./Header.module.css";
import mainheaderImage from "../../Assets/burger-sandwich-header.jpg";
import CartButton from "./Cartbutton";
import io from "socket.io-client";
import { FaBell } from "react-icons/fa";

const Header = (props) => {
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);

  const handleOrderAccepted = (orderId) => {
    setNotifications((prevNotifications) => [
      ...prevNotifications,
      { id: orderId, message: `Order ${orderId} has been accepted` },
    ]);
  };

  const handleOrderRejected = (orderId) => {
    setNotifications((prevNotifications) => [
      ...prevNotifications,
      { id: orderId, message: `Order ${orderId} has been rejected` },
    ]);
  };

  const handleRemoveNotification = (notificationId) => {
    setNotifications((prevNotifications) =>
      prevNotifications.filter(
        (notification) => notification.id !== notificationId
      )
    );
  };

  // Set up socket listeners
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

  const handleNotificationButtonClick = () => {
    setShowNotifications((prevState) => !prevState);
  };

  return (
    <Fragment>
      <header className={classes.header}>
        <h1>Food Ordering App</h1>
        <CartButton onClick={props.onShowCart} />
        <button
          className={`${classes.button} notificationButton`}
          onClick={handleNotificationButtonClick}
        >
          <div className={`notificationIcon ${showNotifications && "open"}`}>
            <span className="icon">
              <FaBell />
            </span>
            {notifications.length > 0 && (
              <span className="badge">{notifications.length}</span>
            )}
          </div>
          {showNotifications && (
            <div className="notificationsContainer openDownwards">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className="notification"
                  onClick={() => handleRemoveNotification(notification.id)}
                >
                  {notification.message}
                </div>
              ))}
            </div>
          )}
        </button>
      </header>
      <div className={classes["main-image"]}>
        <img src={mainheaderImage} alt="A table full of delicious food!" />
      </div>
    </Fragment>
  );
};

export default Header;
