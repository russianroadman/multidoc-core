const db = require('../database/database')
const {Document, Block, Version, Content} = require('../models/multidoc')
const {deleteBlock} = require("./builder");

module.exports = {

	load: function load(uuid){

		return db
			.sync()
			.then(() => {
				return Document.findByPk(uuid, {
					include: [{
						model: Block,
						include: [{
							model: Version,
							include: {
								model: Content
							}
						}]
					}]
				})
			})

	},

	create: function create(documentTitle, blockTitle, versionTitle){

		return db
			.sync()
			.then(() => {
				return Document.create({
					title: documentTitle
				})
			})
			.then(d => {
				return Block.create({
					title: blockTitle,
					documentId: d.id
				})
			})
			.then(b => {
				return Version.create({
					title: versionTitle,
					preferred: true,
					blockId: b.id
				})
			})
			.then(v => {
				return Content.create({
					content: '<p></p>',
					versionId: v.id
				})
			})

	},

	findDocumentByContent: function findDocumentByContent(uuid){

		return db
			.sync()
			.then(() => {
				return Content.findByPk(uuid)
			})
			.then(c => {
				return Version.findByPk(c.versionId)
			})
			.then(v => {
				return Block.findByPk(v.blockId)
			})
			.then(b => {
				return b.documentId
			})

	},

	deleteDocument: function deleteDocument(uuid){

		return db
			.sync()
			.then(() => {
				Document.destroy({
					where: { id : uuid }
				})
			})

	},

	setDocumentTitle: function setDocumentTitle(uuid, title){

		return db
			.sync()
			.then(() => {
				Document.update(
					{ title: title },
					{ where: { id : uuid } }
				)
			})

	},

	setBlockTitle: function setBlockTitle(uuid, title){

		return db
			.sync()
			.then(() => {
				Block.update(
					{ title: title },
					{ where: { id : uuid } }
				)
			})

	},

	setVersionTitle: function setVersionTitle(uuid, title){

		return db
			.sync()
			.then(() => {
				Version.update(
					{ title: title },
					{ where: { id : uuid } }
				)
			})

	},

	addBlock: function addBlock(uuid, blockTitle, versionTitle){

		return db
			.sync()
			.then(() => {
				return Document.findByPk(uuid)
			})
			.then(d => {
				return Block.create({
					title: blockTitle,
					documentId: d.id
				})
			})
			.then(b => {
				return Version.create({
					title: versionTitle,
					preferred: true,
					blockId: b.id
				})
			})
			.then(v => {
				return Content.create({
					content: '<p></p>',
					versionId: v.id
				})
			})

	},

	deleteBlock: function deleteBlock(uuid){

		return db
			.sync()
			.then(() => {
				Block.destroy({
					where: { id : uuid }
				})
			})

	},

	addVersion: function addVersion(uuid, title){

		// todo prevent multiple preferred versions

		return db
			.sync()
			.then(() => {
				return Block.findByPk(uuid)
			})
			.then(b => {
				return Version.create({
					title: title,
					preferred: true,
					blockId: b.id
				})
			})
			.then(v => {
				return Content.create({
					content: '<p></p>',
					versionId: v.id
				})
			})

	},

	deleteVersion: function deleteVersion(uuid) {

		return db
			.sync()
			.then(() => {
				Version.destroy({
					where: { id : uuid }
				})
			})

	},

	isPreferred: function isPreferred(uuid) {

		return db
			.sync()
			.then(() => {
				return Version.findByPk(uuid)
			})
			.then(v => {
				return v.preferred
			})

	},

	setPreferred: function setPreferred(uuid) {

		// todo prevent multiple preferred versions

		return db
			.sync()
			.then(() => {
				Version.update(
					{ preferred: true },
					{ where: { id : uuid } }
				)
			})

	},

	getContent: function getContent(uuid) {

		return db
			.sync()
			.then(() => {
				return Content.findByPk(uuid)
			})

	},

	saveContent: function saveContent(uuid, content) {

		return db
			.sync()
			.then(() => {
				Content.update(
					{ content: content },
					{ where: { id : uuid } }
				)
			})

	}

}

