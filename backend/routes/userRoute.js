const {Router} = require("express");
const express = require('express');// for creating APIs
const mongoose = require('mongoose');// for connecting NODE JS and MongoDB
const User = require("../models/userModel");

const router = express.Router();//creating router variable with the help of which we access all the routing methods

// create operation(post method because we are entering something into the data base)
router.post("/",async (req,res)=>{
  // destructuring of the data jo humne schema create kiya tha
  // NOTE --> During destructuring key exactly same hona chahiye which is written in the userSchema
  let {name,email,age} = req.body;

  try {
    const userAdded = await User.create({
      // key - userScehma wala hai , value - jo req.body(frontend) se aa raha hai
      name : name,
      email : email,
      age : age,
    });

    res.status(201).json(userAdded);

  } catch (error) {
    console.log(error);
    res.status(400).json({error:error.message});
  }
});


// READ(GET) data OPERATION 
router.get("/", async (req,res)=>{
  const showAll = await User.find();
  try {
    const showAll = await User.find();
    res.status(200).json(showAll);

  } catch (error) {
    console.log(error);
    res.send(500).json({error:error.message});
  }
});

// get single user
router.get("/:id", async (req,res)=>{
  const {id} = req.params;// url se id bahar nikalne ke liye we use (req.params)
  // user jo bhi enter kar raha hai in input field waha se id ke liye we use (req.body)
  try {
    const singleUser = await User.findById({_id: id});// findById method use karenge ek single user ke liye
    res.status(200).json(singleUser);

  } catch (error) {
    console.log(error);
    res.send(500).json({error:error.message});
  }
});


// delete operation
router.delete("/:id", async (req,res)=>{
  const {id} = req.params;
  try {
    const showAll = await User.findByIdAndDelete({_id:id});
    res.status(200).json(showAll);

  } catch (error) {
    console.log(error);
    res.send(500).json({error:error.message});
  }
});

// put(UPDATE) Operation
router.patch("/:id",async (req,res)=>{
  const {id} = req.params;
  const {name,email,age} = req.body;// new data that we have to update
  try {
    const updateUser = await User.findByIdAndUpdate(id, req.body,{new : true});
    res.status(200).json(updateUser);
  } catch (error) {
    console.log(error);
    res.status(500).json({error:error.message});
  }
})

module.exports = router;