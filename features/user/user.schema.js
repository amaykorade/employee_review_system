import mongoose from "mongoose";

export const userSchema = new mongoose.Schema({
    name: { type: String },
    email: { type: String, unique: true, required: true },
    password: { type: String },
    type: {
        type: String,
        enum: ['Admin', 'Employee']
    }
})