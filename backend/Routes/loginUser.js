const express = require('express')
const { body , validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs') 
const router = express.Router();
const jwtSecret = "secretkeyhaiye"
const user = require('../models/users')

module.exports = router.post("/loginuser",[
		body('password','Minimum 8 characters are required').isLength({min : 8}),
		body('email','Please Enter a valid email address').isEmail()
		
	],
	async (req  , res) => {
	
		const errors = validationResult(req);

		if (!errors.isEmpty()){
			return res.status(400).json({ errors : errors.array()})
		}

		let email = req.body.email;

		try{
			let userData = await user.findOne({email});
			
			if(!userData){
				return res.status(400).json({errors : "You are not a registered."})
			}

			const pCompare = await bcrypt.compare(req.body.password , userData.password)

			console.log(`answer ye hai be ${pCompare} , ${req.body.password} ,${userData.name}`)

			if( !pCompare ){
				return res.status(400).json({errors : "Incorrect passwword" })		
			}	

			const data ={
				user : {
					id : userData.id
				}
			}

			const authToken = jwt.sign(data,jwtSecret)
			return res.json({success : true , authToken : authToken})
			// return res.json({userData})

		}catch (error){
			console.log(error)
			res.json({success:false});
		}
})
