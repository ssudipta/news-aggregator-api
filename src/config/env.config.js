const dotenv = require("dotenv");

dotenv.config();

module.exports = {
    JWT_Secret_Key: process.env.JWT_Secret_Key || "ThisisSecret9999@"
}