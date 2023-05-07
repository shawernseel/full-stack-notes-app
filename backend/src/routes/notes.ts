import express from "express";
import * as NotesController from "../controllers/notes";

const router = express.Router(); //sets endpoints on router

router.get("/", NotesController.getNotes); //get is a Http get request

router.get("/:noteId", NotesController.getNote);

router.post("/", NotesController.createNote);

export default router;