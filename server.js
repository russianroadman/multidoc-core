const express = require('express')
const bp = require('body-parser')
const cors = require('cors')
const db = require('./database/database')
const {Document, Block, Version, Content} = require('./models/multidoc')
const load = require("./document/builder");

const jp = bp.json()
const app = express()
const port = 8080

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

load('e010c1ce-ed25-4344-8ea2-1369c229ae32')

app.use(cors({credentials: true, origin: true}))

app.get('/get', (req, res) => {
    res.send('Hello World!')
})

app.post('/post', jp, (req,res) => {
    console.log(req.body);
    res.sendStatus(200)
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})