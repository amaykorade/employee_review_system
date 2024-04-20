import mongoose from "mongoose";

export const perSchema = new mongoose.Schema({
    empId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Admin'
    },
    name: { type: String },
    email: { type: String, unique: true, required: true },
    age: { type: Number },
    department: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Admin'
    }
})
