const app = require('express')();
const db = require('./db.json');
const http = require('http').Server(app);
const io = require('socket.io')(http);

const documents = db.data;

io.on('connection', socket => {
    let previousId;
    const safeJoin = currentId => {
        socket.leave(previousId);
        socket.join(currentId, () => console.log(`Socket ${socket.id} joined room ${currentId}`));
        previousId = currentId;
    }

    socket.on('getDoc', docId => {
        safeJoin(docId);
        socket.emit('document', documents[docId]);
    });


    io.emit('list', documents);

    console.log(`Socket ${socket.id} has connected`);
});

http.listen(4444, () => {
    console.log('Listening on port 4444');
});
