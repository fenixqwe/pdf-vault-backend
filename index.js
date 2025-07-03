require('dotenv').config();

const express = require('express');
const sequelize = require('./db');
const cors = require('cors');

const models = require('./models/models'); // ?????

const router = require('./routes');
const errorHandler = require('./middleware/errorMiddleware');

const {Role} = require("./models/models");

const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors({
    exposedHeaders: ['Content-Disposition'],
}));
app.use(express.json());
app.use('/api', router);

app.use(errorHandler);

const start = async () => {
    try {
        console.log('Starting...');
        await sequelize.authenticate();
        await sequelize.sync();

        const roles = await Role.findAll();
        if (roles.length === 0) {
            await Role.bulkCreate([
                { name: 'USER' },
                { name: 'ADMIN' },
            ]);
            console.log('Default roles created');
        }

        app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
    } catch (error) {
        console.log(error);
    }
}

start();