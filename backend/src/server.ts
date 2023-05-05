import express from "express";
const app = express(); //app is our server
const port = 5000;

app.get("/", (req, res) => { //an endpoint for a http get request
    res.send("Hello, World!");
});

app.listen(port, () => { //starts the server
    console.log("Server running on port: " + port); //callback
});

