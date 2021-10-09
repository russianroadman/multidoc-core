const api = require('./api/api')
const db = require('./database/database')

const port = 8080

api.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`)
})
