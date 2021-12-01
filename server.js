const api = require('./api/api')
const Ws = require('websocket').server
const http = require('http')
const {v4} = require("uuid");

const port = 8080
const server = http.createServer(api);
server.listen(port, () => console.log(`core is running at http://localhost:${port}`))

const ws = new Ws({
	httpServer: server
})
const documents = {}
const clients = {}

ws.on('request', req => {

	const userID = v4()
	const connection = req.accept(null, req.origin)
	clients[userID] = connection

	connection.on('message', msg => {

		if (msg.type === 'utf8'){

			const m = JSON.parse(msg.utf8Data).msg
			const dId = m.payload.documentId

			switch (m.type) {
				case 'connection':
					connect(dId, userID)
					break;
				case 'action':
					action(dId, m)
					break;
			}

		}

	})

})

ws.on('disconnect', () => {
	console.log('disconnected')
})


const connect = (dId, userID) => {
	if (documents[dId] === undefined) {
		documents[dId] = [userID]
	} else {
		documents[dId].push(userID)
	}
	for (let id in documents){
		console.log(id, ':', documents[id].length)
	}
}

const action = (dId, m) => {
	let specificClients = documents[dId]
	for (let c in specificClients) {
		clients[specificClients[c]].sendUTF(JSON.stringify({
			payload: m.payload
		}))
	}
}

const send = (userID, body) => {
	if (ping(userID)) clients[userID].sendUTF(body)
	else clients[userID].delete()
}

const ping = (userID) => {
	return clients[userID].sendUTF('ping')
}
