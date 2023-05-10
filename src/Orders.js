import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Orders.css";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [currentDate, setCurrentDate] = useState();

  const hourInMilliseconds = 1000 * 60 * 60;

  useEffect(() => {
    axios
      .get("http://localhost:3000/orders")
      .then((response) => {
        setOrders(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentDate(new Date());
    }, hourInMilliseconds); // update every hour

    return () => clearInterval(intervalId);
  }, [hourInMilliseconds]);

  useEffect(() => {
    // reset the table when the day changes
    if (currentDate) {
      setOrders([]);
    }
  }, [currentDate && currentDate.getDate()]);

  const totalAmount = orders.reduce(
    (acc, order) => acc + order.prices * order.amount,
    0
  );

  const handleAccept = (orderId) => {
    axios
      .put(`http://localhost:3000/orders/${orderId}`, { status: "accepted" })
      .then((response) => {
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order.userId === orderId ? { ...order, status: "accepted" } : order
          )
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleReject = (orderId) => {
    axios
      .put(`http://localhost:3000/orders/${orderId}`, { status: "accepted" })
      .then((response) => {
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order.userId === orderId ? { ...order, status: "accepted" } : order
          )
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="orders-container">
      <h1>ORDERS</h1>
      <div className="order-sale">
        Sale:{" "}
        {totalAmount.toLocaleString("en-GB", {
          style: "currency",
          currency: "GBP",
        })}
      </div>
      <table className="orders-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Price</th>
            <th>Amount</th>
            <th>Date</th>
            <th>Time</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.OrderId}>
              <td>{order.OrderId}</td>
              <td>{order.name}</td>
              <td>
                {order.prices.toLocaleString("en-GB", {
                  style: "currency",
                  currency: "GBP",
                })}
              </td>
              <td>{order.amount}</td>
              <td>
                {new Date(order.Date).toLocaleDateString("en-GB", {
                  timeZone: "Europe/London",
                })}
              </td>
              <td>{order.time}</td>
              <td>
                <div>
                  <>
                    <button
                      className="action-button accept"
                      onClick={() => handleAccept(order.userId)}
                    >
                      Accept
                    </button>
                    <button
                      className="action-button reject"
                      onClick={() => handleReject(order.OrderId)}
                    >
                      Reject
                    </button>
                  </>

                  {order.status === "accepted" && <button>On Its Way</button>}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Orders;
