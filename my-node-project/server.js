const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const user = "mongodb+srv:Login-Winner:holyspirit(2002)@cluster0.xrwjhoz.mongodb.net/?appName=Cluster0";

mongoose.connect(mongoURL,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(()=>console.log("MongoDB connected"))
    .catch(err=>console.log(err));

app.listen(5000, ()=>{
    console.log("Server running on port 5000");
}); 