import Server from 'socket.io';

export default function startServer(store) {
	const io = new Server().attach(8090);

// What we'll do is subscribe a listener to the store that reads the current state, 
// turns it into a plain JavaScript object, and emits it as a state event on the Socket.io server. 
// The result will be that a JSON-serialized snapshot of the state is sent over all active Socket.io connections.
	store.subscribe(
		() => io.emit('state', store.getState().toJS())
	);

// We can listen to 'connection' events on our Socket.io server. 
// We get one each time a client connects. 
// In the event listener we can emit the current state right away:
	io.on('connection', (socket) => {
		socket.emit('state', store.getState().JS());
		socket.on('action', store.dispatch.bind(store));
	});
}