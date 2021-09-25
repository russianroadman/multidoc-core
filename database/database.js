const Sequelize = require('sequelize')

const db = new Sequelize('multidoc', 'postgres', '1234', {
    dialect: 'postgres',
    host: 'localhost'
})

module.exports = db