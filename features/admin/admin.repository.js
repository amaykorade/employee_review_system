import mongoose from "mongoose";
import { adminSchema } from "./admin.schema.js";

const AdminModel = mongoose.model('Admin', adminSchema);

export default class AdminRepository {


    async viewEmp() {
        try {
            const data = await AdminModel.find();
            return data;
        } catch (err) {
            console.log(err);
            throw new Error("Error fetching employee data");
        }
    }

    async add(emp) {
        try {
            const existingEmployee = await AdminModel.findOne({ email: emp.email });
            if (!existingEmployee) {
                const newEmp = new AdminModel(emp);
                await newEmp.save();
                return newEmp;
            } else {
                return "Employee with the details exist";
            }
        } catch (err) {
            console.log(err);
            console.log("error saving data")
        }
    }

    async delete(id) {
        try {
            const emp = await AdminModel.deleteOne({ _id: id });
            if (emp.deletedCount === 1) {
                return "Employee deleted successfully";
            } else {
                throw new Error("Employee not found");
            }
        } catch (err) {
            console.log(err);
            console.log("error deleting data");
            throw new Error("Internal Server Error");
        }
    }

    async updateEmp(ID, data) {
        try {
            console.log(ID)
            console.log(data)
            const emp = await AdminModel.findByIdAndUpdate(ID, data, { new: true });
            if (!emp) {
                throw new Error("Employee not found");
            }
            return emp;
        } catch (err) {
            console.log(err);
            console.log("error deleting data");
            throw new Error("Internal Server Error");
        }
    }
}