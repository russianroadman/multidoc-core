const express = require('express')
const bp = require('body-parser')
const cors = require('cors')
const documentService = require('../document/document-service')

const jp = bp.json()
const api = express()

api.use(cors({credentials: true, origin: true}))

// todo add catch

api.get('/test/:id/', (req, res) => {
	documentService.load(req.params.id).then(r => res.send(r))
})

/* update document */
api.post('/update', jp, (req,res) => {
	documentService.load(req.body.documentId).then(r => res.send(r))
});

/* force update document */
api.post('/force-update', jp, (req,res) => {
	documentService.load(req.body.documentId).then(r => res.send(r))
});

/* create document */
api.post('/create', jp, (req,res) => {
	documentService.create(req.body.documentTitle, req.body.blockTitle, req.body.versionTitle)
		.then(r => res.send(r))
		.catch(e => console.log(e))
});

api.post('/create-example', jp, (req,res) => {
	documentService.createExample()
		.then(r => res.send(r))
		.catch(e => console.log(e))
});

/* delete document */
api.post('/delete', jp, (req,res) => {
	documentService.deleteDocument(req.body.documentId).then(() => res.sendStatus(200))
});

/* save document title */
api.post('/save-document-title', jp, (req,res) => {
	documentService.setDocumentTitle(req.body.documentId, req.body.documentTitle).then(() => res.sendStatus(200))
});

/* save block title */
api.post('/save-block-title', jp, (req,res) => {
	documentService.setBlockTitle(req.body.blockId, req.body.blockTitle).then(() => res.sendStatus(200))
});

/* save version title */
api.post('/save-version-title', jp, (req,res) => {
	documentService.setVersionTitle(req.body.versionId, req.body.versionTitle).then(() => res.sendStatus(200))
});

/* add block */
api.post('/add-block', jp, (req,res) => {
	documentService.addBlock(req.body.documentId, req.body.blockTitle, req.body.versionTitle).then(() => res.sendStatus(200))
});

/* delete block */
api.post('/delete-block', jp, (req,res) => {
	documentService.deleteBlock(req.body.blockId).then(() => res.sendStatus(200))
});

/* add version */
api.post('/add-version', jp, (req,res) => {
	documentService.addVersion(req.body.blockId, req.body.versionTitle).then(() => res.sendStatus(200))
});

/* delete version */
api.post('/delete-version', jp, (req,res) => {
	documentService.deleteVersion(req.body.versionId).then(() => res.sendStatus(200))
});

/* check if preferred */
api.post('/is-preferred', jp, (req,res) => {
	documentService.isPreferred(req.body.versionId).then(r => res.send(r))
});

/* set as preferred */
api.post('/set-preferred', jp, (req,res) => {
	documentService.setPreferred(req.body.versionId).then(() => res.sendStatus(200))
});

/* get content */
api.post('/get-content', jp, (req,res) => {
	documentService.getContent(req.body.contentId).then(r => res.send(r))
});

/* save content */
api.post('/save-content', jp, (req,res) => {
	/*
	 *	Когда пользователь сохраняет контент - всем клиентам посылается соответствующее сообщение
	 *  Клиент получает сообщение о том, что был сохранён контент с id, если при этом у пользователя
	 *  курсор стоит на контенте с этим id - посылается сообщение о том, что редактирование запрещено,
	 *  и текущее сохранение отменяется
	 */
	documentService.saveContent(req.body.contentId, req.body.content).then(() => res.sendStatus(200))
});

api.post('/get-preferred-list', jp, (req,res) => {
	documentService
		.load(req.body.documentId)
		.then(d => {
			res.send(documentService.getPreferredContents(d))
		})
});

module.exports = api
