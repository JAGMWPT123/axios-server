const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

app.use(bodyParser.json());
app.use(cors()); // Enable CORS for all routes

const PORT = 5000;

const rooms = [];

app.post('/api/create-room', (req, res) => {
  const roomId = generateRoomId();
  const newRoom = {
    roomId,
    users: [],
  };

  rooms.push(newRoom);
  res.json({ newRoom });
});

app.post('/api/join-room', (req, res) => {
  const { roomId, username } = req.body;
  const room = rooms.find((r) => r.roomId === roomId);

  if (room) {
    room.users.push({ username });
    res.json({ message: 'User joined successfully' });
  } else {
    res.status(404).json({ error: 'Room not found' });
  }
});

app.get('/', (req, res) => {
  const data = { message: 'Server says hello' };
  res.json(data);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

function generateRoomId() {
  return Math.random().toString(36).substr(2, 6).toUpperCase();
}
