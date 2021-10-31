const api = require('./api/api')
const Ws = require('websocket').server
const http = require('http')
const { v4: v4 } = require('uuid');
const {use} = require("express/lib/router");

const port = 8080
const server = http.createServer(api);
server.listen(port, () => console.log(`core is running at http://localhost:${port}`))

const ws = new Ws({
	httpServer: server
})
const clients = {}
const documents = {}

ws.on('request', req => {

	let userID = v4()
	const connection = req.accept(null, req.origin)
	clients[userID] = connection
	console.log('connected: ', userID)

	connection.on('message', msg => {

		if (msg.type === 'utf8'){
			let m = JSON.parse(msg.utf8Data).msg
			if (m.type === 'connection'){
				if (documents[m.payload] === undefined){
					documents[m.payload] = [userID]
				} else {
					documents[m.payload] = [ ...documents[m.payload], userID]
				}
				console.log(documents)
			}
			for (let key in clients){
				// clients[key].sendUTF(msg.utf8Data)
				// console.log('sent message "' + JSON.parse(msg.utf8Data).msg + '" to: ', key)
			}
		}

	})

})
