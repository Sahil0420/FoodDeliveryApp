const express = require('express')
const router = express.Router();
const user = require('../models/users')
const {body , validationResult } = require('express-validator')
const jwt  = require('jsonwebtoken')
const bcrypt = require('bcryptjs') 

router.post("/createuser" , [
			body('name').isLength({min : 5}) , 
			body('password','Minimum 8 characters are required').isLength({min : 8}),
			body('email','Please Enter a valid email address').isEmail()
		],

	async (req  , res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()){
			return res.status(400).json({ errors : errors.array()})
		}

		const salt = await bcrypt.genSalt(10);	
		let secPassword = await bcrypt.hash(req.body.password , salt)

		try{
			await user.create({
				name:req.body.name,
				password : secPassword,
				email : req.body.email,
				address: req.body.address
			}).then(()=>res.json({success : true}))
		}catch (error){
			console.log(error)
			res.json({success:false});
		}
})

module.exports = router