import express from 'express';
import AdminController from './admin.controller.js';

const adminRouter = express.Router();

const adminController = new AdminController();

adminRouter.get('/', (req, res, next) => {
    adminController.emp(req, res, next)
})

adminRouter.post('/', (req, res, next) => {
    adminController.addEmp(req, res, next)
})

adminRouter.delete('/:id', (req, res, next) => {
    adminController.removeEmp(req, res, next)
})

adminRouter.put('/:id', (req, res, next) => {
    adminController.updtEmp(req, res, next)
})

export default adminRouter;