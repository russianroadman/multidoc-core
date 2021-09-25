const express = require('express')
const bp = require('body-parser')
const cors = require('cors')
const db = require('./database/database')
const {Document, Block, Version, Content} = require('./models/multidoc')

const jp = bp.json()
const app = express()
const port = 8080


db
    .sync({force:true})
    // .sync()
    .then(result => {
        return Document.create({
            title: 'my first document'
        })
    })
    .then(d => {
        return d.createBlock({
            title: 'blockbuster'
        })
    })
    .then(d => {
        Document.findAll().then(x => {
            console.log('all documents: \n')
            x.forEach(el => console.log(el))
        })
    })
    .catch(err => console.log(err));

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