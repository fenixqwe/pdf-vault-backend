require('dotenv').config();

const express = require('express');
const sequelize = require('./db');
const cors = require('cors');
const fileUpload = require("express-fileupload")

const {ErrorMiddleware} = require('common-lib');

const models = require('./models/models');

const router = require('./routes');

const PORT = process.env.PORT || 5000;
const app = express();

app.use(fileUpload({
    createParentPath: true
}))
app.use(express.static('uploads'));

app.use(cors({
    exposedHeaders: ['Content-Disposition'],
}));
app.use(express.json());
app.use('/api', router)

app.use(ErrorMiddleware);

const start = async () => {
    try {
        console.log('Starting...');
        await sequelize.authenticate();
        await sequelize.sync();
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
    } catch (error) {
        console.log(error);
    }
}

start();