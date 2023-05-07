//SEPARATED FROM server CODE for testing so we don't mess up data
import "dotenv/config"; //this is a shorthand for import
import express, { NextFunction, Request, Response } from "express";
// == const express = require("express");
import notesRoutes from "./routes/notes";
import morgan from "morgan";

const app = express(); //app is our server

app.use(morgan("dev")); //logs endpoints accessed

app.use(express.json()); //sets up express so we can sent json to server

app.use("/api/notes", notesRoutes);

app.use((req, res, next) => { //types figured out automatically
    next(Error("Endopoint not found"));
});

//express recognizes this as error handler //types script does not infer type
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((error: unknown, req: Request, res: Response, next: NextFunction) => { 
    console.error(error);
    let errorMessage = "An unknown error occurred";
    if (error instanceof Error) errorMessage = error.message;
    res.status(500).json({ error: errorMessage }); //500 internal server error
});

export default app; //default: export one single thing