const express = require('express');// for creating APIs
const mongoose = require('mongoose');// for connecting NODE JS and MongoDB
const app = express();
const dotenv = require("dotenv");
//after importing dotenv file we will have to make call to the config file
dotenv.config();

const userRoute = require("./routes/userRoute");

const cors = require("cors");
// CORS is used to resolve the issue of servers running of multiple servers
app.use(cors());

app.use(express.json());// directly req.body se data will not be read so we will have to convert into json format

mongoose
  .connect(process.env.URI)//keep mongodb link in secure file (.env file)
  .then(()=>{
    console.log("connected successfully!!");
    app.listen(process.env.PORT || 8000,(err)=>{
      if(err) console.log(err);
      console.log("Server Running successfully on port",process.env.PORT);
    });
  })
  .catch((error)=>{
    console.log("error",error);
  })

  //app.use("/api/user",userRoute);// default api -- /api/user ho jaayegi
  app.use(userRoute);

