import mongoose from "mongoose";
import { perSchema } from "./emp.schema.js";

const PerModel = mongoose.model('Emp', perSchema);

export default class PerRepository {

    async create() {
        try {
            const existingPer = await PerModel.findOne({});
            if (!existingPer) {
                const newPer = new PerModel();
                await newPer.save();
                return newPer;
            } else {
                return "Performance review for the same exist"
            }
        } catch (err) {
            console.log(err);
            console.log("error saving data")
        }
    }
}