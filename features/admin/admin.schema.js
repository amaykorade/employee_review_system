import mongoose from "mongoose";

export const adminSchema = new mongoose.Schema({
    adminID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    name: { type: String },
    email: { type: String, unique: true, required: true },
    age: { type: Number },
    department: {
        type: String,
        enum: ['Technical', 'Accounting', 'Management', 'Marketing', 'PR']
    }
})
