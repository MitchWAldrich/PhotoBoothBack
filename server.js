// server.js
const express = require('express')
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware (optional)
app.use(cors()); // allow connections from mobile app
app.use(express.json());

// Data
let submittedData = [];
console.log('submitted', submittedData)
// Routes
app.get('/', (req, res) => {
  res.send('Hello from Express!');
});

// GET endpoint to view submitted data
app.get('/submitted-clients', (req, res) => {
  
  res.json(submittedData);
});

app.post('/client-info', (req, res) => {
  const { name, email, isPastAudience, event } = req.body;

  const entry = { name, email, event, isPastAudience, timestamp: new Date().toISOString() };
  submittedData.push(entry);
console.log('entry', entry)
console.log('afterEntry', submittedData);
  if (!name || !email || !isPastAudience || !event) {
    return res.status(400).json({ error: 'Name, email, and isPastAudience are required.' });
  }

  console.log(`Received from client: Name=${name}, Email=${email}, isPastAudience=${isPastAudience}, event=${event}`);

  res.json({ response: `Hello, ${name}. Your email is "${email} and you have / have not seen a past Opera Atelier show, ${isPastAudience}"` });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});