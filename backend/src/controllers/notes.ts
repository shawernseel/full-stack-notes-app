import { RequestHandler } from "express";
import NoteModel from "../models/note";
import createHttpError from "http-errors";

//Request Handler: (typescript type) a function excecuted every time the server reveives a particular request
export const getNotes: RequestHandler = async (req, res, next) => { //an endpoint for a http get request //typescript figures out types
    //res.send("Hello, World!");
    // this is async calls find then callback exec
    // await gets value of node and not promise value
    // .exec() (mongoose) returns a promise (error) similar to .catch in server - returns a better stack trace
    try {
        const notes = await NoteModel.find().exec();
        res.status(200).json(notes); //HTTP status for OK //notes is an array so no need {}
    } catch (error) {
        next(error); //middlewear that passes to error handler
    }
};

export const getNote: RequestHandler = async (req, res, next) => {
    const noteId = req.params.noteId;

    try {
        const note = await NoteModel.findById(noteId).exec(); //findById mongoose
        res.status(200).json(note);
    } catch (error) {
        next(error);
    }
};

// creates typescript types of string | undefined for title and text
interface CreateNoteBody { //interface similar to type but more flexible
    title?: string, 
    text?: string, //text may be undefined
}

 //unknown leaves param (there are 4 of them) as untouched (hover to see types)
export const createNote: RequestHandler<unknown, unknown, CreateNoteBody, unknown> = async(req, res, next) => {
    const title = req.body.title;
    const text = req.body.text;

    //check invalide type error, mongoose auto status is 500 so need to change

    try {
        // catch error
        if(!title) {
            throw createHttpError(400, "Note must have a title"); //400: Bad request (argument is missing)
        }

        const newNote = await NoteModel.create({
            title: title,
            text: text,
        });

        res.status(201).json(newNote); //201 new resource created
    } catch (error) {
        next(error);
    }
}