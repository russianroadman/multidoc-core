const Sequelize = require('sequelize')

// const db = new Sequelize('multidoc', 'postgres', '1234', {
//     dialect: 'postgres',
//     host: 'localhost',
//     logging: false
// })

db = new Sequelize(process.env.DATABASE_URL, {
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false
            }
        }
    }
)

db
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    })

module.exports = db
