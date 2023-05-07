import { RequestHandler } from "express";
import NoteModel from "../models/note";
import createHttpError from "http-errors";
import mongoose from "mongoose";

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

// at this point there is some requested value for objectId 
export const getNote: RequestHandler = async (req, res, next) => {
    const noteId = req.params.noteId; // no interface needed as typescript knows that this is not null

    try {
        //misshaped noteId in getNote error handler
        if (!mongoose.isValidObjectId(noteId)) {
            throw createHttpError(400, "Invalid note id");
        }

        const note = await NoteModel.findById(noteId).exec(); //findById mongoose

        //invalid noteId error handler
        if (!note) {
            throw createHttpError(404, "Note not found");
        }

        res.status(200).json(note);
    } catch (error) {
        next(error);
    }
};

// creates typescript types of string | undefined for title and text
interface CreateNoteBody { //interface similar to type but more flexible
    title?: string,
    text?: string, //text may be undefined
};

//unknown leaves param (there are 4 of them) as untouched (hover to see types)
export const createNote: RequestHandler<unknown, unknown, CreateNoteBody, unknown> = async (req, res, next) => {
    const title = req.body.title;
    const text = req.body.text;

    //check invalide type error, mongoose auto status is 500 so need to change

    try {
        // catch error
        if (!title) {
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
};

interface UpdateNoteParams {
    noteId: string, //not noteId?, we know it exists because we need it to get to this endpoint

}

interface UpdateNoteBody {
    title?: string, //we are unsure if caller passes in these args
    text?: string,
}

export const updateNote: RequestHandler<UpdateNoteParams, unknown, UpdateNoteBody, unknown> = async (req, res, next) => {
    const noteId = req.params.noteId;
    const newTitle = req.body.title;
    const newText = req.body.text;

    try {
        //error handling
        if (!mongoose.isValidObjectId(noteId)) {
            throw createHttpError(400, "Invalid note id");
        }

        if (!newTitle) {
            throw createHttpError(400, "to update, note must have a title"); //400: Bad request (argument is missing)
        }

        const note = await NoteModel.findById(noteId).exec();

        if (!note) {
            throw createHttpError(404, "Note not found");
        }

        //update note
        note.title = newTitle;
        note.text = newText;

        const updatedNote = await note.save(); //.save() saves changes ... passes error to catch if fails
        //alternatively NoteModel.findByIdAndUpdate

        //return updated note to caller
        res.status(200).json(updatedNote);

    } catch (error) {
        next(error);
    }
};

export const deleteNote: RequestHandler = async(req, res, next) => {
    const noteId = req.params.noteId;

    try {
        if (!mongoose.isValidObjectId(noteId)) {
            throw createHttpError(400, "Invalid note id");
        }

        const note = await NoteModel.findById(noteId).exec();

        if (!note) {
            throw createHttpError(404, "Note not found");
        }

        await note.deleteOne(); 
        //alternative NoteModel.findByIdAnd(Remove or smth like that)

        res.sendStatus(204); //204: deletion successful // since no .json, have to add SENDstatus



    } catch (error) {
        next(error);
    }
};