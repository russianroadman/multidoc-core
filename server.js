const express = require('express')
const bp = require('body-parser')
const jp = bp.json()
const app = express()
const port = 8080

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.post('/post', (req, res) => {
    console.log('kek')
    console.log(JSON.stringify(req.body))
    res.send('good good')
})

app.post('/handle', jp, (req,res) => {
    console.log(req.body);
    res.send('cool')
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})