import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Orders.css";
import io from "socket.io-client";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [currentDate, setCurrentDate] = useState();
  const socket = io("http://localhost:3000");

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
  }, [currentDate]);

  const handleAccept = (orderId) => {
    const updatedOrders = orders.map((order) => {
      if (order.OrderId === orderId) {
        return { ...order, status: "Accepted" };
      } else {
        return order;
      }
    });
    setOrders(updatedOrders);
    socket.emit("acceptOrder", orderId);
  };

  const handleReject = (orderId) => {
    const updatedOrders = orders.map((order) => {
      if (order.OrderId === orderId) {
        return { ...order, status: "Rejected" };
      } else {
        return order;
      }
    });
    setOrders(updatedOrders);
    socket.emit("rejectOrder", orderId);
    console.log(socket);
  };

  const totalAmount = orders.reduce(
    (acc, order) => acc + order.prices * order.amount,
    0
  );

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
            <th>Action</th>
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
              <td>{order.status}</td>
              <td>
                <div style={{ display: "flex" }}>
                  <button
                    onClick={() => handleAccept(order.OrderId)}
                    className="action-button accept"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => handleReject(order.OrderId)}
                    className="action-button reject"
                    style={{ marginLeft: "10px" }}
                  >
                    Reject
                  </button>
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
