const db = require('../database/database')
const {Document, Block, Version, Content} = require('../models/multidoc')

module.exports = {

	load: function load(uuid) {

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

	create: function create(documentTitle, blockTitle, versionTitle) {

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

	findDocumentByContent: function findDocumentByContent(uuid) {

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

}

