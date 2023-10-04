"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize_2 = __importDefault(require("../config/sequelize"));
class Contact extends sequelize_1.Model {
}
Contact.init({
    contact_id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    contact_name: {
        type: sequelize_1.DataTypes.STRING(100),
    },
    contact_email: {
        type: sequelize_1.DataTypes.STRING(255),
    },
    contact_mobile: {
        type: sequelize_1.DataTypes.STRING(11),
    },
    contact_phone: {
        type: sequelize_1.DataTypes.STRING(10),
    },
    contact_is_favorite: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: false,
    },
    contact_is_active: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: false,
    },
    contact_created_at: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize_1.DataTypes.NOW,
    },
}, {
    sequelize: sequelize_2.default,
    modelName: 'Contact',
});
exports.default = Contact;
