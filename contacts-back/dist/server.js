"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./routes/routes"));
const sequelize_1 = __importDefault(require("./config/sequelize"));
require("dotenv/config");
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
app.use(routes_1.default);
app.listen(PORT, async () => {
    try {
        await sequelize_1.default.authenticate();
        console.log('Connection has been established successfully.');
    }
    catch (error) {
        console.error('Unable to connect to the database:', error);
    }
    console.log('HTTP Server running!');
});
