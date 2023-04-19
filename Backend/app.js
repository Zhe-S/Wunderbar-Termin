const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = 3000;

// 连接 MongoDB 数据库
mongoose.connect("mongodb://localhost/my_database", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// 定义数据类型
const Booking = mongoose.model("Booking", {
  date: String,
  name: String,
  email: String,
});

// 处理 POST / bookings 路由
app.post("/bookings", async (req, res) => {
  const { date, name, email } = req.body;

  const booking = new Booking({
    date,
    name,
    email,
  });

  await booking.save();

  res.json({
    message: "Booking created successfully!",
  });
});

// 监听端口
app.listen(port, () => {
  console.log(`*** Express应用程序正在监听端口${port}... ***`);
});

/* 
这段代码定义了一个路由，它监听根路径("/")的GET请求
监听 3000 端口 
*/
