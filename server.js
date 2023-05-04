const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "user",
});

app.post("/signup", (req, res) => {
  const sql = "INSERT INTO login(`name`, `email`, `password`) VALUES (?, ?, ?)";
  const values = [req.body.name, req.body.email, req.body.password];
  db.query(sql, values, (err, data) => {
    if (err) {
      return res.json({ error: err.message }); // return error message as JSON object
    }
    return res.json({ success: true }); // return success as JSON object
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
  const { name, prices } = req.body.item;
  const sql = "INSERT INTO orders (name, prices) VALUES (?, ?)";
  const values = [name, prices];

  db.query(sql, values, (err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: "Error inserting data" });
    }
    console.log(data);
    return res.json({ success: true });
  });
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
