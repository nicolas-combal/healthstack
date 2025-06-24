const { DataTypes } = require('sequelize')

const sequelize = require('../config/db.config');

const Report = sequelize.define('Report', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    id_doctor: {
        type: DataTypes.INTEGER,
    },
    id_patient: {
        type: DataTypes.INTEGER
    },
    text:{
        type: DataTypes.TEXT
    }
});

module.exports = Report
