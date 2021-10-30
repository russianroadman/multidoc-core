const api = require('./api/api')
const Ws = require('websocket').server
const http = require('http')
const { v4: v4 } = require('uuid');

const port = 8080
const server = http.createServer(api);
server.listen(port, () => console.log(`core is running at http://localhost:${port}`))

const ws = new Ws({
	httpServer: server
})
const clients = {}

ws.on('request', req => {

	let userID = v4()
	const connection = req.accept(null, req.origin)
	clients[userID] = connection
	// console.log('connected: ', userID, ' in ', Object.getOwnPropertyNames(clients))

	connection.on('message', msg => {

		if (msg.type === 'utf8'){
			console.log('message from ', userID, ' : ', msg.utf8Data)
			for (let key in clients){
				clients[key].sendUTF(msg.utf8Data)
				console.log('sent message "' + JSON.parse(msg.utf8Data).msg + '" to: ', key)
			}
		}

	})

})
