import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Orders.css";

function Orders() {
  const [orders, setOrders] = useState([]);

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
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.name}</td>
              <td>
                {order.prices.toLocaleString("en-GB", {
                  style: "currency",
                  currency: "GBP",
                })}
              </td>
              <td>{order.amount}</td>
              <td>{new Date(order.Date).toLocaleDateString()}</td>
              <td>{new Date(order.Date).toLocaleTimeString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Orders;
