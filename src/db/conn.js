const mongoose=require("mongoose");
const express=require("express");
const path=require("path");
const app= express();

mongoose.connect("mongodb://localhost:27017/deepdata",{useNewUrlParser: true, 
useUnifiedTopology: true}).then(()=>{

    console.log("connection successfull");
}).catch((e)=>{
    console.log(e);
})