const axios = require('axios');

const USER_SERVICE_URL = process.env.USER_SERVICE_URL;

async function getUserByAccessHash(hash) {
    try {
        const response = await axios.get(`${USER_SERVICE_URL}/api/user/by-access-hash/${hash}`);
        return response.data;
    } catch (error) {
        return null;
    }
}

async function getUserByRefreshHash(hash) {
    try {
        const response = await axios.get(`${USER_SERVICE_URL}/api/user/by-refresh-hash/${hash}`);
        return response.data;
    } catch (error) {
        return null;
    }
}

module.exports = {
    getUserByAccessHash,
    getUserByRefreshHash
};