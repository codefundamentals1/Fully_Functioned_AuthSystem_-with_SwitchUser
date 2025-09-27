const express = require("express")
const app = express();
const port = 3000
const Authroute = require("./Routes/Authroute")
const DashBoardRoute = require ("./Routes/DashBoardRoute");
const makeConnection = require("./dbconfig/db.config");
app.use(express.json())
app.get("/api", (req, res)=>{
	console.log("req recieved");
	console.log(req.headers['token'])
	res.status(200).json({ msg :"Hii this is home"})
})
makeConnection();


app.use('/api/auth' , Authroute );
app.use("/api/dashboard" , DashBoardRoute);

app.listen(port ,()=>{
	console.log(`app is listening at port ${port}`)
})
