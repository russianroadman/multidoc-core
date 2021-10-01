const Sequelize = require('sequelize')

const db = new Sequelize('multidoc', 'postgres', '1234', {
    dialect: 'postgres',
    host: 'localhost'
})

module.exports = db

// db
//     .sync({force:true})
//     // .sync()
//     .then(() => {
//         return Document.create({
//             title: 'my first document'
//         })
//     })
//     .then(d => {
//         return Block.create({
//             title: 'blockbuster',
//             documentId: d.id
//         })
//     })
//     .then(b => {
//         return Version.create({
//             title: 'Version',
//             preferred: true,
//             blockId: b.id
//         })
//     })
//     .then(v => {
//         return Content.create({
//             content: '<p>hello world</p>',
//             versionId: v.id
//         })
//     })
//     .then(() => {
//         Document.findAll().then(x => {
//             console.log('all documents: \n')
//             x.forEach(el => console.log(el))
//         })
//     })
//     .catch(err => console.log(err));