import app from "./app";
import env from "./util/validateEnv";
import mongoose from "mongoose";

const port = env.PORT; 

mongoose.connect(env.MONGO_CONNECTION_STRING) //can't use async await at top level
    .then(() => {
        console.log("Mongoose connected");

        app.listen(port, () => { //starts the server
            console.log("Server running on port: " + port); //callback
        });

    })
    .catch(console.error);

