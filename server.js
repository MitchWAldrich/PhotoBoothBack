const express = require('express');
const cors = require('cors');
const { Resend } = require('resend');
require('dotenv').config(); // to read from .env
import { Resend } from 'resend';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Email client
const resend = new Resend(process.env.RESEND_API_KEY);

// Data store (in-memory)
let submittedData = [];

// Routes
app.get('/', (req, res) => {
  res.send('Hello from Express!');
});

app.get('/submitted-clients', (req, res) => {
  res.json(submittedData);
});

app.post('/client-info', async (req, res) => {
  const { name, email, isPastAudience, event } = req.body;

  if (!name || !email || isPastAudience === undefined || !event) {
    return res.status(400).json({
      error: 'Name, email, isPastAudience, and event are required.',
    });
  }

  const entry = {
    name,
    email,
    event,
    isPastAudience,
    timestamp: new Date().toISOString(),
  };

  submittedData.push(entry);
  console.log('New entry:', entry);

  const responseMessage = `Hello, ${name}. Your email is "${email}" and you ${
    isPastAudience ? 'have' : 'have not'
  } seen a past Opera Atelier show.`;

  // Send email using Resend
  try {
    const resend = new Resend('••••••••••••••••••••••••••••••••••••');

    resend.emails.send({
      from: process.env.FROM_EMAIL, // e.g., ...@operaatelier.com
      to: email,
      subject: 'Hello World',
      html: `<p>${responseMessage}</p><p>Event: ${event}</p>`
    });

    console.log('Email sent:', emailResponse);
  } catch (error) {
    console.error('Email failed:', error);
  }

  res.json({ response: responseMessage });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
