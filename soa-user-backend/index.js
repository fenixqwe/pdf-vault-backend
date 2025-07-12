require('dotenv').config();

const express = require('express');
const sequelize = require('./db');
const cors = require('cors');

const router = require('./routes');
const {ErrorMiddleware} = require('common-lib');

const {Role, User} = require("./models/models");
const bcrypt = require('bcrypt');

const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors({
    exposedHeaders: ['Content-Disposition'],
}));
app.use(express.json());
app.use('/api', router);

app.use(ErrorMiddleware);

async function createInitialDevData() {
    const rolesCount = await Role.count();
    if (rolesCount === 0) {
        await Role.bulkCreate([
            { name: 'USER' },
            { name: 'ADMIN' },
        ]);
        console.log('Default roles created');
    }

    const usersCount = await User.count();
    if (usersCount === 0) {
        const adminRole = await Role.findOne({ where: { name: 'ADMIN' } });

        const hashedPassword = await bcrypt.hash('12345678', 5);

        await User.create({
            name: 'Admin',
            email: 'admin@gmail.com',
            password: hashedPassword,
            number: '',
            role_id: adminRole.role_id,
        });

        console.log('Default admin created (email: admin@gmail.com, password: 12345678)');
    }
}

const start = async () => {
    try {
        console.log('Starting...');
        await sequelize.authenticate();
        await sequelize.sync();


        // ONLY DEV CODE
        await createInitialDevData();

        app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
    } catch (error) {
        console.log(error);
    }
}

start();