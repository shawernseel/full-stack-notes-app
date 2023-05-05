//SEPARATED FROM server CODE for testing so we don't mess up data
import "dotenv/config"; //this is a shorthand for import
import express from "express";

const app = express(); //app is our server

app.get("/", (req, res) => { //an endpoint for a http get request
    res.send("Hello, World!");
});

export default app; //default: export one single thing