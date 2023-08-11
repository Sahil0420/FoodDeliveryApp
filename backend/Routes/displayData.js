const express = require('express')
const router = express.Router()

module.exports = router.post('/foodData' , (req , res)=>{
	try{
		// console.log(global.food_items)
		res.send([global.food_items , global.food_category])
	}catch(err){
		console.error(err.message)
		res.send("Server Error!")
	}
})
