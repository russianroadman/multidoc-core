const express = require('express')
const bp = require('body-parser')
const cors = require('cors')
const load = require("../document/builder")

const jp = bp.json()
const api = express()

api.use(cors({credentials: true, origin: true}))

api.get('/test', (req, res) => {
	load('e010c1ce-ed25-4344-8ea2-1369c229ae32').then(r => res.send(r))
})

/* update document */


/* force update document */


/* save content */


/* save document title */


/* save block title */


/* save version title */


/* check if preferred */


/* set as preferred */


/* create document */


/* add block */


/* add version */


/* get content */


api.post('/post', jp, (req,res) => {
	console.log(req.body);
	res.sendStatus(200)
});

module.exports = api
