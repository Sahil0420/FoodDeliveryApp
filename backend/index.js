const express = require('express')		//importing express
const app = express()							
const database = require('./db')		//db is the file where database name is written
const cors = require('cors')
const port = 4000;			//portnumber on which backend will run

database(); 		//{execution of fxn()} connecting database to backend

// app.use((req,res,next)=>{
// 	res.setHeader("Access-Control-Allow-Origin","http://localhost:3000");
// 	res.header(
// 		"Access-Control-Allow-Headers",
// 		"Origin, X-requesteed-With , Content-Type , Accept"
// 	);
// 	next();
// })


app.use(express.json())
app.use(cors())
app.use('/api',require("./Routes/createUser"))
app.use('/api',require("./Routes/displayData"))
app.use('/api',require('./Routes/loginUser'))
app.use('/api',require('./Routes/orderData'))
app.use('/api',require('./Routes/yourOrders')) 		//filename daalna hota hai yahaan

app.get('/' , (req , res) => {
	res.send('this is the home page');
})


app.listen(port , ()=>{
	console.log(`app listening on the port number ${port}`)
})
