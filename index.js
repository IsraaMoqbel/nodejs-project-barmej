//  استيراد المكتبات المطلوبة | import the required libraries
import express from 'express';
import mongoose from 'mongoose';
import teacherRouter from './routes/teacher.js';
import studentRouter from './routes/student.js';
import { undefinedRequestMiddleware } from './middlewares/undefinedRequest.js';
import bodyParser from 'body-parser';
// to be able to read environment variables ~ للتمكن من قراءة متغيرات النظام في ملف env
import env from 'dotenv';

//  تأكد من تنزيل الوحدات المطلوبة | make sure to download the required modules

env.config();

var app = express();

const DATABASE_URL = process.env.NODE_ENV === 'production' ? process.env.PROD_DATABASE_URL : process.env.DATABASE_URL;

mongoose.connect(DATABASE_URL, { useUnifiedTopology: true, useNewUrlParser: true });

const connection = mongoose.connection;

connection.once("open", function () {
   console.log("MongoDB database connection established successfully");
});

// body parser configurations
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// routers
app.use('/teacher', teacherRouter);
app.use('/student', studentRouter);
// handle undefined requests ~ التعامل مع الطلبات غير المعرفة
app.use(undefinedRequestMiddleware);

// لا تنسى تحديد وظيفة الخادم | don't forget to define the server function that listens to requests
app.listen(3000, () => console.log('Server is running on port 3000...'));

