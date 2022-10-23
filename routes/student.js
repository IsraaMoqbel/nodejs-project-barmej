import express from 'express';
import {
    registerStudent,
    loginStudent,
    getStudent,
    updateStudent,
    deleteStudent,
} from "../controllers/student.js";

const studentRouter = express.Router();

// Student Routes
studentRouter.route('/register').post(registerStudent);
studentRouter.route('/login').post(loginStudent);
studentRouter.route('/data').get(getStudent);
studentRouter.route('/:id').put(updateStudent);
studentRouter.route('/:id').delete(deleteStudent);

export default studentRouter;