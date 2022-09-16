/*********************************************************************************
*  WEB422 – Assignment 1
*  I declare that this assignment is my own work in accordance with Seneca  Academic Policy.  
*  No part of this assignment has been copied manually or electronically from any other source
*  (including web sites) or distributed to other students.
* 
*  Name: JILESH PATEL Student ID: 135745180 Date: SEPTEMBER 16, 2022
*  Heroku Link: https://arnin-web422-ass1.herokuapp.com/
*
********************************************************************************/ 

const express = require("express");
const path = require('path');
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const MoviesDB = require("./modules/moviesDB.js");
// Load dotenv variables
require('dotenv').config();
const {MONGODB_CONN_STRING} = process.env;
const db = new MoviesDB();
//const myData = dataService(`mongodb+srv://${process.env.dbUser}:${process.env.dbPass}@cluster0-apgkj.mongodb.net/${process.env.dbName}?retryWrites=true&w=majority`);
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const HTTP_PORT = process.env.PORT || 8080;

db.initialize(process.env.MONGODB_CONN_STRING).then(()=>{
    app.listen(HTTP_PORT, ()=>{
        console.log(`server listening on: ${HTTP_PORT}`);
    });
}).catch((err)=>{
    console.log(err);
});


// ************* API Routes
app.get("/", (req, res) => {
    res.json({message: "API Listening"})
});

// POST /api/sales (NOTE: This route must read the contents of the request body)
app.post("/api/movies", (req,res) => {
    myData.addNewMovie(req.body)
    .then(() => {
            res.status(201).json(`new movie successfully added`);
        })
        .catch((err) => {
            res.status(400).json(err);
        });
});


// GET /api/sales (NOTE: This route must accept the numeric query parameters "page" and "perPage", ie: /api/sales?page=1&perPage=5 )
app.get("/api/movies", (req,res) => {
    myData.getAllMovies(req.query.page, req.query.perPage)
        .then((movies) => {
            res.status(200).json(sales);
        })
        .catch((err) => {
            res.status(400).json(err);
        });
});


// GET /api/sales (NOTE: This route must accept a numeric route parameter, ie: /api/sales/5bd761dcae323e45a93ccfe8)
app.get("/api/movies/:id", (req,res) => {
    myData.getMovieById(req.params.id)
        .then((movies) => {
            res.status(200).json(movies);
        })
        .catch((err) => {
            res.status(404).json(err);
        });
});


// PUT /api/sales (NOTE: This route must accept a numeric route parameter, ie: /api/sales/5bd761dcae323e45a93ccfe8 as well as read the contents of the request body)
app.put("/api/movies/:id", (req,res) => {
    myData.updateMovieById(req.body, req.params.id)
        .then(() => {
            res.status(200).json(`movie ${req.body._id} successfully updated`);
        })
        .catch((err) => {
            res.status(404).json(err);
        });
});


// DELETE /api/sales (NOTE: This route must accept a numeric route parameter, ie: /api/sales/5bd761dcae323e45a93ccfe8)
app.delete("/api/movies/:id", (req,res) => {
    myData.deleteMovieById(req.params.id)
        .then(() => {
            res.status(200).json(`movie ${req.params.id} successfully deleted`);
        })
        .catch((err) => {
            res.status(404).json(err);
        });
});