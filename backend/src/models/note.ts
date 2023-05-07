import { InferSchemaType, model, Schema } from "mongoose";

const noteSchema = new Schema({ //Schema defines what data node contains
    title: { type: String,  required: true }, //String <- uses contructors, not string
    text: { type: String },    
}, {timestamps: true }); //mongoose manages timestamps and adds to schema

type Note = InferSchemaType<typeof noteSchema>; //type saftey for typescript // mongoose creates a Note type

export default model<Note>("Note", noteSchema); //creates a collection with the name Note