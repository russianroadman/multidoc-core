const db = require('../database/database')
const {Document, Block, Version, Content} = require('../models/multidoc')

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
			.catch(e => e)

	},

	create: function create(documentTitle, blockTitle, versionTitle, content='<p></p>'){

		let id

		return db
			.sync()
			.then(() => {
				return Document.create({
					title: documentTitle
				})
			})
			.then(d => {
				id = d.id
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
				Content.create({
					content: content,
					versionId: v.id
				})
				return id
			})

	},

	createExample: function createExample(){

		let id

		return db
			.sync()
			.then(() => {
				return Document.create({
					title: 'Book of recipes'
				})
			})
			.then(d => {
				id = d.id
				return Block.create({
					title: 'Pizza',
					documentId: d.id
				})
			})
			.then(b => {
				return Version.create({
					title: 'John',
					preferred: true,
					blockId: b.id
				})
			})
			.then(v => {
				Content.create({
					content: '<ul><li>Preheat oven to 450 degrees F (230 degrees C). In a medium bowl, dissolve yeast and sugar in warm water. Let stand until creamy, about 10 minutes.</li><li>Stir in flour, salt and oil. Beat until smooth. Let rest for 5 minutes.</li><li>Turn dough out onto a lightly floured surface and pat or roll into a round. Transfer crust to a lightly greased pizza pan or baker\'s peel dusted with cornmeal. Spread with desired toppings and bake in preheated oven for 15 to 20 minutes, or until golden brown. Let baked pizza cool for 5 minutes before serving.</li></ul>',
					versionId: v.id
				})
				return id
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

		return db
			.sync()
			.then(() => {
				return Block.findByPk(uuid)
			})
			.then(b => {
				return Version.create({
					title: title,
					preferred: false,
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

		// todo if preferred was deleted then first becomes preferred

		return db
			.sync()
			.then(() => {
				return Version.findByPk(uuid)
			})
			.then(v => {
				return Block.findByPk(v.blockId)
			})
			.then(b => {
				return Version.findAll({
					where: { blockId : b.id }
				})
			})
			.then(vs => {
				if (vs.length > 1){
					Version.destroy({
						where: { id : uuid }
					})
					console.log('version ' + uuid + ' was deleted')
				} else {
					console.log('version ' + uuid + ' is the only version')
				}
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

		return db
			.sync()
			.then(() => {
				return Version.findByPk(uuid)
			})
			.then(v => {
				return Block.findByPk(v.blockId)
			})
			.then(b => {
				return Version.findAll({
					where: { blockId : b.id }
				})
			})
			.then(vs => {
				vs.forEach(v => {
					Version.update(
						{ preferred: false },
						{
							where: {
								id : v.id,
								preferred : true
							}
						}
					)
				})
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

	},

	getPreferredContents: function getPreferredContents(document) {
		let preferredVersions = []
		document.blocks.forEach(b => {
			preferredVersions.push(b.versions.find(v => v.preferred).content.content)
		})
		return preferredVersions
	}

}

