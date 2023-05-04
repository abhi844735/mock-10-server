const express=require("express");
const app = express()
const connection=require("./config/db");
const { userRoute } = require("./routes/user.router");
const cors=require("cors");
require("dotenv").config();

app.use(express.json());
app.use(cors())
app.use("/user",userRoute)

app.get("/",(req,res)=>{
    try {
        res.send("hello this is mock-10-server")
    } catch (error) {
        res.send(error.message)
    }
})
app.listen(process.env.port,async()=>{
    try {
        await connection;
        console.log("connected to database")
    } catch (error) {
        console.log(error.message)
    }
    console.log("connected to server")
})

