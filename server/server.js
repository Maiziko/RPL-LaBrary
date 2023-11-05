require("dotenv").config();
const express = require("express");
const 

const app = express();


app.use((req,res, next)=>{
    res.status(404).json({
        status: "fail",
    });
});


// get all Restaurants 
app.get("/getRestaurants", (req, res) => {
    res.status(200).json({
        status: "succes",
        data:{
        restaurants: ["restaurants","makan"]},
    });
});
//http://localhost:3001/getRestaurants

//Get a Restaurant 
app.get("/api/v1/restaurants/:restaurantid",(req, res)=>{
    console.log(req,params);
});

// create a Restaurant 

app.post("/api/v1/restaurants",(req,res)=>{
    console.log(req); 
});



const port = process.env.PORT || 3001;
app.listen(port, ()=>{
    console.log(`server is up and listening on port ${(port)}`);
});






