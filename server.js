const api = require('./api/api')
// const db = require('./database/database')
// const {Document, Block, Version, Content} = require('./models/multidoc')

const port = 8080

// db
// 	.sync({force:true})
// 	// .sync()
// 	.then(() => {
// 		return Document.create({
// 			title: 'my first document'
// 		})
// 	})
// 	.then(d => {
// 		return Block.create({
// 			title: 'blockbuster',
// 			documentId: d.id
// 		})
// 	})
// 	.then(b => {
// 		return Version.create({
// 			title: 'Version',
// 			preferred: true,
// 			blockId: b.id
// 		})
// 	})
// 	.then(v => {
// 		return Content.create({
// 			content: '<p>hello world</p>',
// 			versionId: v.id
// 		})
// 	})
// 	.then(() => {
// 		Document.findAll().then(x => {
// 			console.log('all documents: \n')
// 			x.forEach(el => console.log(el))
// 		})
// 	})
// 	.catch(err => console.log(err));

api.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`)
})
