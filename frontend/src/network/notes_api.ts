import { Note } from "../models/note";

//same data accepted as fetch
async function fetchData(input: RequestInfo, init?: RequestInit) {
    const response = await fetch(input, init);
    //front end must manually check for 404 and 500 errors
    if (response.ok) {
        return response;
    } else {
        const errorBody = await response.json();
        const errorMessage = errorBody.error;
        throw Error(errorMessage);
    }
}

export async function fetchNotes(): Promise<Note[]> { //async return type is always a promise
    const response = await fetchData("/api/notes", { method: "GET" }); //GET request
    return response.json(); //json since backend sends a json
}

export interface NoteInput {
    title: string,
    text?: string,
}

export async function createNote(note: NoteInput): Promise<Note> {
    const response = await fetchData("/api/notes",
    {
        method: "POST",
        headers: {
            "Content-Type": "application/json", //tells backend format
        },
        body: JSON.stringify(note), //we can only send string between backend and front end
    });
    return response.json();
}

export async function deleteNote(noteId: string) {
    await fetchData("/api/notes/" + noteId, {method: "DELETE"});
}