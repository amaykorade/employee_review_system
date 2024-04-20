import mongoose from "mongoose";
import AdminRepository from "./admin.repository.js";

export default class AdminController {
    constructor() {
        this.adminRepository = new AdminRepository();
    }

    async emp(req, res, next) {
        try {
            const data = await this.adminRepository.viewEmp();
            res.status(200).send(data);
        } catch (err) {
            console.log(err);
            console.log("Error fetching employee data");
            res.status(500).send("Internal Server Error");
        }
    }

    async addEmp(req, res, next) {
        try {
            const adminid = req.userID;
            const adminID = new mongoose.Types.ObjectId(adminid);
            const { name, email, age, department } = req.body;
            const data = { adminID, name, email, age, department }
            const emp = await this.adminRepository.add(data);
            return res.status(201).send(emp);
        } catch (err) {
            console.log(err);
            console.log("error passing new emp");
            return res.status(500).send("Internal Server Error");
        }
    }

    async removeEmp(req, res, next) {
        try {
            const id = req.params.id;
            const ID = new mongoose.Types.ObjectId(id);
            await this.adminRepository.delete(ID);
            res.status(200).send("Employee deleted successfully")
        } catch (err) {
            console.log(err);
            console.log("Error deleting employee");
            res.status(500).send("Internal Server Error");
        }
    }

    async updtEmp(req, res, next) {
        try {
            const id = req.params.id;
            const ID = new mongoose.Types.ObjectId(id);
            const data = req.body;
            await this.adminRepository.updateEmp(ID, data);
            res.status(200).send("updated successfully")
        } catch (err) {
            console.log(err);
            console.log("Error deleting employee");
            res.status(500).send("Internal Server Error");
        }
    }

}