import { RequestHandler } from "express";
import NoteModel from "../models/note";

export const getNotes: RequestHandler = async (req, res, next) => { //an endpoint for a http get request //typescript figures out types
    //res.send("Hello, World!");
    // this is async calls find then callback exec
    // await gets value of node and not promise value
    try {
        const notes = await NoteModel.find().exec(); //exec returns a promise similar to .catch in server
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

export const createNote: RequestHandler = async(req, res, next) => {
    const title = req.body.title;
    const text = req.body.text;

    try {
        const newNote = await NoteModel.create({
            title: title,
            text: text,
        });

        res.status(201).json(newNote); //201 new resource created
    } catch (error) {
        next(error);
    }
}