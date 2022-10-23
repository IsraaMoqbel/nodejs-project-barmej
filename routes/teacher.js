import express from 'express';
import * as teacherController from "../controllers/teacher.js";

const teacherRouter = express.Router();

// Teacher Routes
teacherRouter.route('/register').post(teacherController.registerTeacher);
teacherRouter.route('/login').post(teacherController.loginTeacher);
teacherRouter.route('/data').get(teacherController.getTeacher);
teacherRouter.route('/:id').put(teacherController.updateTeacher);
teacherRouter.route('/:id').delete(teacherController.deleteTeacher);

export default teacherRouter;