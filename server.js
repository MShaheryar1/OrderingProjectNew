const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();
const http = require("http");

const server = http.createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "user",
  timezone: "Europe/London",
});

app.post("/signup", (req, res) => {
  const sql = "INSERT INTO login(`name`, `email`, `password`) VALUES (?, ?, ?)";
  const values = [req.body.name, req.body.email, req.body.password];
  db.query(sql, values, (err, data) => {
    if (err) {
      return res.json({ error: err.message });
    }
    return res.json({ success: true });
  });
});

app.post("/login", (req, res) => {
  const sql = "SELECT * FROM login WHERE `email` = ? AND `password` = ?";
  db.query(sql, [req.body.email, req.body.password], (err, data) => {
    if (err) {
      return res.json("Error" + err);
    }
    if (data.length > 0) {
      return res.json("Success");
    } else {
      {
        return res.json("Login Failed");
      }
    }
  });
});
app.post("/cart", (req, res) => {
  const cartItems = req.body;
  const values = cartItems.map((item) => [item.name, item.prices, item.amount]);
  const currentDate = new Date();
  const formattedDate = currentDate
    .toISOString()
    .slice(0, 19)
    .replace("T", " ");
  const sql = "INSERT INTO orders (name, prices, amount, date) VALUES ?";
  const rows = values.map((row) => [...row, formattedDate]);

  db.query(sql, [rows], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Error inserting data" });
    }

    const insertedRows = rows.map((value, index) => ({
      id: result.insertId + index,
      name: value[0],
      prices: value[1],
      date: value[3],
      time: value[3],
    }));

    return res.json({ success: true, data: insertedRows });
  });
});

app.get("/orders", (req, res) => {
  const sql = "SELECT * FROM orders";
  db.query(sql, (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Error fetching data" });
    }

    return res.json({ success: true, data });
  });
});
app.post("/Orders/:id/accept", (req, res) => {
  const orderId = req.params.Orderid;
  const sql = "UPDATE orders SET status = 'accepted' WHERE id = ?";
  db.query(sql, [orderId], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Error updating data" });
    }

    return res.json({ success: true });
  });
});

app.post("/orders/:id/reject", (req, res) => {
  const orderId = req.params.id;
  const sql = "UPDATE orders SET status = 'rejected' WHERE id = ?";
  db.query(sql, [orderId], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Error updating data" });
    }

    return res.json({ success: true });
  });
});
io.on("connection", (socket) => {
  socket.on("acceptOrder", (orderId) => {
    console.log(`Order ${orderId} has been accepted`);
    io.emit("orderAccepted", orderId);
  });

  socket.on("rejectOrder", (orderId) => {
    console.log(`Order ${orderId} has been rejected`);
    io.emit("orderRejected", orderId);
  });
  socket.on("newOrder", () => {
    console.log(`You have a new Order `);
    io.emit("newOrder");
  });
});

server.listen(3000, () => {
  console.log("Server started on port 3000");
});
