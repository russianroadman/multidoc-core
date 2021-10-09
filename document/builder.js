const db = require('../database/database')
const {Document, Block, Version, Content} = require('../models/multidoc')

module.exports = function load(uuid) {

	return db
		.sync({force:true})
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
		.catch(err => console.log(err));

}
