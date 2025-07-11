import express from 'express';

import cors from 'cors';

const app = express();
const PORT = 3000;

app.use(cors()); // allow connections from mobile app
app.use(express.json());

app.get('/hello', (req, res) => {
  res.json({ message: 'Hello from backend!' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});