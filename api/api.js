const express = require('express')
const bp = require('body-parser')
const cors = require('cors')
const {load, create, findDocumentByContent} = require('../document/builder')

const jp = bp.json()
const api = express()

api.use(cors({credentials: true, origin: true}))

api.get('/test/:id/', (req, res) => {
	load(req.params.id).then(r => res.send(r))
})

/* update document */
api.post('/update', jp, (req,res) => {
	load(req.body.documentId).then(r => res.send(r))
});

/* force update document */
api.post('/force-update', jp, (req,res) => {
	load(req.body.documentId).then(r => res.send(r))
});

/* create document */
api.post('/create', jp, (req,res) => {
	create(req.body.documentTitle, req.body.blockTitle, req.body.versionTitle).then(
		r => {
			findDocumentByContent(r.id).then(docId => console.log('promise find: ', res.send(docId)));
		}
	)
});

/* delete document */
api.post('/delete', jp, (req,res) => {

});

/* save document title */
api.post('/save-document-title', jp, (req,res) => {

});

/* save block title */
api.post('/save-block-title', jp, (req,res) => {

});

/* save version title */
api.post('/save-version-title', jp, (req,res) => {

});

/* add block */
api.post('/add-block', jp, (req,res) => {

});

/* delete block */
api.post('/delete-block', jp, (req,res) => {

});

/* add version */
api.post('/add-version', jp, (req,res) => {

});

/* delete version */
api.post('/delete-version', jp, (req,res) => {

});

/* check if preferred */
api.post('/check-preferred', jp, (req,res) => {

});

/* set as preferred */
api.post('/set-preferred', jp, (req,res) => {

});

/* get content */
api.post('/get-content', jp, (req,res) => {

});

/* save content */
api.post('/save-content', jp, (req,res) => {

});

api.post('/post', jp, (req,res) => {
	console.log(req.body);
	res.sendStatus(200)
});

module.exports = api
