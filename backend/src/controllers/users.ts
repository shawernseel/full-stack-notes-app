import { RequestHandler } from "express";
import createHttpError from "http-errors";
import UserModel from "../models/user";
import bcrypt from "bcrypt";

export const getAuthenticatedUser: RequestHandler = async (req, res, next) => {
    const authenticatedUserId = req.session.userId; //if logged in has userId else undefined

    try {
        if (!authenticatedUserId) {
            throw createHttpError(401, "User not authenticated");
        }

        const user = await UserModel.findById(authenticatedUserId).select("+email").exec(); //don't need to return password
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
};

interface SignUpBody {
    username?: string, //we don't know if user actually sends data
    email?: string,
    password?: string,
}

export const signUp: RequestHandler<unknown, unknown, SignUpBody, unknown> = async (req, res, next) => {
    const username = req.body.username;
    const email = req.body.email;
    const passwordRaw = req.body.password;

    try {
        if (!username || !email || !passwordRaw) {
            throw createHttpError(400, "Parameters missing");
        }

        const existingUsername = await UserModel.findOne({ username: username }).exec();

        if (existingUsername) {
            throw createHttpError(409, "Username already taken. Please choose a different one or log in instead."); //409: clash error
        }

        const existingEmail = await UserModel.findOne({ email: email }).exec();

        if (existingEmail) {
            throw createHttpError(409, "A user with this email address already exists. Please log in instead.");
        }

        const passwordHashed = await bcrypt.hash(passwordRaw, 10); //2nd arg is salting rounds -makes it harder to get password

        const newUser = await UserModel.create({
            username: username,
            email: email,
            password: passwordHashed,
        });

        req.session.userId = newUser._id;

        res.status(201).json(newUser);
    } catch (error) {
        next(error);
    }
};

interface LoginBody {
    username?: string,
    password?: string,
}

export const login: RequestHandler<unknown, unknown, LoginBody, unknown> = async (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;

    try {
        if (!username || !password) {
            throw createHttpError(400, "Parameters missing");
        }
        //check if username exists, select is false so include select explicitally to stay logged in
        const user = await UserModel.findOne({ username: username }).select("+password +email").exec();

        if (!user) {
            throw createHttpError(401, "Invalid credentials"); //401: unauthorized
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            throw createHttpError(401, "Invalid credentials");
        }

        req.session.userId = user._id;
        res.status(201).json(user); //return user to front end
    } catch (error) {
        next(error);
    }
};

export const logout: RequestHandler = (req, res, next) => {
    req.session.destroy(error => { //destroy session
        if (error) {
            next(error);
        } else {
            res.sendStatus(200); //no json body so senStatus not status
        }
    })
};