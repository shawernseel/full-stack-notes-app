//SEPARATED FROM server CODE for testing so we don't mess up data
import "dotenv/config"; //this is a shorthand for import
import express, { NextFunction, Request, Response } from "express";
// == const express = require("express");
import userRoutes from "./routes/users";
import notesRoutes from "./routes/notes";
import morgan from "morgan";
import createHttpError, { isHttpError } from "http-errors";
import session from "express-session";
import env from "./util/validateEnv";
import MongoStore from "connect-mongo";

const app = express(); //app is our server

app.use(morgan("dev")); //logs endpoints accessed

app.use(express.json()); //sets up express so we can sent json to server

app.use(session({
    secret: env.SESSION_SECRET, //assign cookie key to user
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 60 * 60 * 1000, //1 hour
    },
    rolling: true, //revalidates when using
    store: MongoStore.create({
        mongoUrl: env.MONGO_CONNECTION_STRING
    }),
}));

app.use("/api/users", userRoutes);
app.use("/api/notes", notesRoutes);

app.use((req, res, next) => { //types figured out automatically
    next(createHttpError(404, "Endopoint not found")); //uses http-errors package
});

//express recognizes this as error handler //types script does not infer type
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((error: unknown, req: Request, res: Response, next: NextFunction) => { 
    console.error(error);
    let errorMessage = "An unknown error occurred";
    let statusCode = 500; //500 internal server error
    if (isHttpError(error)) {
        statusCode = error.status;
        errorMessage = error.message;
    }
    res.status(statusCode).json({ error: errorMessage });
});

export default app; //default: export one single thing