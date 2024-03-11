const PORT = 3001;

const url_server = `ws://localhost:${PORT}`;

const socket  = new WebSocket(url_server);

export default socket;