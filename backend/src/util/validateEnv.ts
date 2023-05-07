import { cleanEnv } from "envalid"; //{} because there are multiple things
import { port, str } from "envalid/dist/validators"; 

//makes sure these things are not undefined
export default cleanEnv(process.env, {
    MONGO_CONNECTION_STRING: str(), //defines string as type str
    PORT: port(),
});

//this whole thing cleans it so that instead of writing process.env we write just env
//and we make sure things are not undefined (cleanEnv takes care of this)