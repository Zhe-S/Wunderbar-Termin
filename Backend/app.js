require('dotenv').config();
const express = require("express");
const { Sequelize, Op } = require("sequelize");
const app = express();
const port = 3000;

// Parse JSON bodies for this app. Make sure you put
// `app.use(express.json())` **before** your route handlers!
app.use(express.json())

const sequelize = new Sequelize(`mysql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${
  process.env.DB_HOST
}:${process.env.DB_PORT || 3306}/${process.env.DB_SCHEMA}`)

// 定义数据类型
const Booking = sequelize.define('appointment',
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    name: {
        allowNull: false,
        type: Sequelize.STRING(128),
    },
    email: {
        allowNull: false,
        type: Sequelize.STRING(128),
    },
    date: {
        allowNull: false,
        type: Sequelize.DATEONLY,
    },
    status: {
      allowNull: false,
      type: Sequelize.STRING(32),
      defaultValue: "active"
    }
  }, {
  freezeTableName: true,
  timestamps: false
})

app.get('/bookings', async(req, res) => {
  const filter = req.query; // TODO: could be string or string[], extend the logic here
  let bookings;
  if(filter.name === undefined) {
    bookings = await Booking.findAll({where: {status: 'active'}});
  } else {
    bookings = await Booking.findOne({where: {
      name: {
        [Op.like]: `%${filter.name}%`
      },
      status: 'active'
    }})
  }

  res.json({bookings:bookings})
})

// 处理 POST / bookings 路由
app.post("/bookings", async(req, res) => {
  const { date, name, email} = req.body;

  await Booking.create({date: new Date(date), name, email})

  res.json({
    message: "Booking created successfully!",
  });
});

app.delete('/bookings/:booking_id', async (req, res) => {
  const id = req.params.booking_id

  await Booking.update({status: 'deleted'}, {where: {id}})

  res.send({message: 'done'})
})

// 监听端口
app.listen(port, () => {
  console.log(`*** Express应用程序正在监听端口${port}... ***`);
});

/*
这段代码定义了一个路由，它监听根路径("/")的GET请求
监听 3000 端口
*/
