const express = require('express')
const route = express.Router()
const Orders = require('../models/Orders')

module.exports = route.post('/yourOrders' , async(req, res)=>{
  try{
    let userEmail = req.body.email;
    let data = await Orders.findOne({email : userEmail});
    res.json({userOrderData : data})
    console.log(data)
  }catch(err){
    console.log(`error aa gaya hai showOrders.js mein`)
  }
})