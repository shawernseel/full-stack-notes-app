import { InferSchemaType, model, Schema } from "mongoose";

const noteSchema = new Schema({ //Schema defines what data note contains
    userId: { type: Schema.Types.ObjectId, required: true },
    title: { type: String,  required: true }, //String <- uses contructors, not string
    text: { type: String },    
}, {timestamps: true }); //mongoose manages timestamps and adds to schema

//InferSchmaType: -mongoose automatically infers Note type from schema definition
type Note = InferSchemaType<typeof noteSchema>; //type saftey for typescript // mongoose creates a Note type

export default model<Note>("Note", noteSchema); //creates a collection with the name Note