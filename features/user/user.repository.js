import mongoose from "mongoose";
import { userSchema } from "./user.schema.js";

// creating model from schema
const userModel = mongoose.model('User', userSchema);

export default class UserRepository {


    async get(email) {
        try {
            const data = await userModel.find({ email: email });
            return data;
        }
        catch (err) {
            console.log(err);
            console.log("Error fetching data");
        }
    }

    async signUp(user) {
        console.log(user)
        try {
            const presentUser = await userModel.findOne({ email: user.email });
            if (!presentUser) {
                const newUser = new userModel(user);
                await newUser.save();
                return "signup successful";
            } else {
                return "user exist";
            }

        } catch (err) {
            console.log("signup failed");
            console.log(err);
            throw new Error("Signup failed");
        }
    }

    async signIn(email, password) {
        try {
            return await userModel.findOne({ email, password });
        } catch (err) {
            console.log("signin failed");
            console.log(err);
            throw new Error("Signin failed");

        }
    }
}