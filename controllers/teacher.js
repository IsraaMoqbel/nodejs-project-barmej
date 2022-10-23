import Joi from "joi";
import jwt from 'jsonwebtoken'
import { hashPassword } from "../helper.js";
import { INVALID_REQUEST_STATUS_CODE, NOT_FOUND_STATUS_CODE } from "../constants/index.js";
// استيراد وحدةالمدرس | import the teacher module
import teacherModel from "../models/Teacher.js";

// تسجيل مدرس جديد و تخزين بياناته | new teacher sign up
export const registerTeacher = async (req, res) => {
    const { name, email, password, birthday, city } = req.body;

    const bodySchema = Joi.object({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required(),
        birthday: Joi.string().required(),
        city: Joi.string().required()
    })

    const validationResult = bodySchema.validate(req.body);

    if (validationResult.error) {
        res.statusCode = INVALID_REQUEST_STATUS_CODE;
        res.send(validationResult.error.details[0].message);
        return
    }

    try {
        const newTeacher = new teacherModel({
            name,
            email,
            password,
            birthday,
            city
        })

        await newTeacher.save();

        res.send(newTeacher);
    } catch (error) {
        res.send(error.message);
    }
};

// 4. تسجيل دخول مدرس و ارجاع التوكن | teacher login and response with jwt token
export const loginTeacher = async (req, res) => {
    const { email, password } = req.body;

    const user = await teacherModel.findOne({ email });

    if (!user) {
        res.statusCode = 401;
        res.send('User Not Found!!!')
    } else {
        if (user.password === hashPassword(password)) {
            const token = jwt.sign({ sub: user._id }, user.salt, { expiresIn: 30 })
            res.send(token)
        } else {
            res.statusCode = 403;
            res.send('password is wrong')
        }
    }
};

export const getTeacher = async (req, res) => {
    const conditions = {};

    try {
        const token = req.headers.authorization;

        if (!token) {
            res.statusCode = 401;
            res.send('You do not have Permission!!!')
        }

        const decodedToken = jwt.decode(token);

        const teacher = await teacherModel.findById(decodedToken.sub);

        if (!teacher) {
            res.statusCode = 401;
            res.send('You do not have Permission!!!')
            return
        }
    } catch (error) {
        res.statusCode = 401;
        console.log(error.message);
    }

    const data = await teacherModel.find(conditions)

    res.send(data);
};

export const updateTeacher = async (req, res) => {
    const { id } = req.params;
    const teacher = await teacherModel.findById(id);

    if (!teacher) {
        res.statusCode = NOT_FOUND_STATUS_CODE;
        res.send('Teacher Not Found!!!')
    } else {
        const { birthday, city } = req.body;

        if (birthday, city) {
            teacher.birthday = birthday;
            teacher.city = city;
            teacher.save();
        }
        res.send(teacher);
    }
};

export const deleteTeacher = async (req, res) => {
    const { id } = req.params;
    const teacher = await teacherModel.findById(id);

    if (!teacher) {
        res.statusCode = NOT_FOUND_STATUS_CODE;
        res.send('Teacher Not Found!!!')
    } else {
        return teacherModel.remove();
    }
};

// module.exports = {
//     registerTeacher,
//     loginTeacher,
//     getTeacher,
//     updateTeacher,
//     deleteTeacher,
// };