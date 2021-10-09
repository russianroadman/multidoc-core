//import {api} from "./api/api";
const api = require('./api/api')

const port = 8080

api.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`)
})
