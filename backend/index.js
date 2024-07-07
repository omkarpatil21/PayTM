const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const router = require("./routes/index");

const app=express();
app.use(cors());
app.use(express.json());
console.log("index.js");
app.get('/helloword',(req,res)=>{
    res.send("hello world");
})

app.use("/api/v1/",router);

app.listen(2000,()=>{
    console.log("server listening on 3000");
})