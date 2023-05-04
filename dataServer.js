// const express = require("express");
// const mysql = require("mysql");
// const cors = require("cors");

// const app = express();
// app.use(cors());
// app.use(express.json());

// const db = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "",
//   database: "user",
// });

// app.post("/orders", (req, res) => {
//   const sql =
//     "INSERT INTO orders (item_name, item_price, total_amount) VALUES (?, ?, ?)";
//   const values = [req.body.name, req.body.prices, req.body.totalamount];

//   db.query(sql, values, (err, data) => {
//     if (err) {
//       return res.json({ error: err.message });

//       // return error message as JSON object
//     }
//     console.log(data);
//     return res.json({ success: true }); // return success as JSON object
//   });
// });

// app.listen(3000, () => {
//   console.log("Server started on port 3000");
// });
