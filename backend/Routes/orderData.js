const express = require('express')
const router = express.Router()
const Orders = require('../models/Orders')

module.exports = router.post("/orderData", async (req, res) => {
  let data = req.body.order_data;
  await data.splice(0, 0, { Order_date: req.body.order_date});

  // console.log(data)
  //agar email pehle se nahi hai database mein then create karein nahi to data daalein
  let eId = await Orders.findOne({email: req.body.email});
  if (eId === null) {
    try {
      await Orders.create({
        email: req.body.email,
        order_data:[data],
      }).then(() => {
        res.json({ success: true });
        
      });
    } catch (error) {
      console.log(`This is the error in create email : ${error.message}`);
      res.send("Server Error ", error.message);
    }
  } else {
    try {
      await Orders.findOneAndUpdate({ email: req.body.email },{ $push: { order_data: data } })
      res.json({ success: true });
    } catch (error) {
      console.log(`This is findandupdate error ${error}`)
      res.send("Server Error", error.message);
    }
  }
});
