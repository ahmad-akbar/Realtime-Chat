const express = require('express')
const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http)
const port = 3001
const router = require('./routes/chatRoom')
const cors = require('cors')


app.use(cors())
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(router)

io.on('connection', socket => {
    const id = socket.id
    console.log('connect socket io');

    socket.on('message', ({ name, message }) => {
      io.emit('message', { name, message })
    })
  
    socket.on('disconnect', () => {
      console.log("user disconnected");
    })
  })

http.listen(port, () => {
    console.log(`Running on port ${port}`);
})
