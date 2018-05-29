const http		= require('http').createServer(req_handler);
const fs			= require('fs');
const io			= require('socket.io')(http);
const port		= process.argv[2] || 3000;


http.listen(port, () => {
	console.log(`Server Started on port ${port}`);
});

function req_handler(req, res) {
	fs.readFile(__dirname + '/public/index.html', (err, data) => {
		if (err) {
			res.writeHead(404, {'Content-Type': 'text/html'});
			return res.end('404 Not Found. ');
		} else {
			res.writeHead(200, {'Content-Type': 'text/html'});
			res.write(data);
			return res.end();
		}
	});
}

io.on('connection', (socket) => {
	console.log(`${socket.id} connected. `);

	socket.on('message', (message) => {
		console.log(message);
	});
});
