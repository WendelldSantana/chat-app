const express = require('express');
const http = require('http');
const path = require('path')
const socketIo = require('socket.io');
const cors = require('cors');
const authRoutes = require('./auth')

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000", // Permitir apenas requisições de localhost:3000
    methods: ["GET", "POST"], // Métodos permitidos
  }
});

app.use(cors());
app.use(express.json());
app.use('/auth', authRoutes)


app.use(express.static(path.join(__dirname, 'batepapo-app/build')))

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'batepapo-app;build', 'index.html'))
})


app.get('/', (req, res) => {
  res.send('Servidor Socket.io está funcionando!');
});

io.on('connection', (socket) => {
  console.log('Novo cliente conectado');

  socket.on("mensagem", (data) => {
    io.emit("mensagem", data); // Envia a mensagem para todos os usuários
  });

  socket.on('disconnect', () => {
    console.log('Cliente desconectado');
  });
});

server.listen(3000, () => {
  console.log('Servidor rodando na porta 3001');
});