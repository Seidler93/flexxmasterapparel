import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';

const app = express();
const PORT = 3000;

const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyydToT9NVHJCVtFlPjEvoJfqGTy0x7QxZJzE7-AJLXleXb95a_V_ioul6NN5MZXuNsGQ/exec';

import cors from 'cors';

app.use(cors({
  origin: 'https://flexxmasterapparel.vercel.app'  // ✅ Add your Vercel frontend URL
}));

app.use(express.json());

app.post('/submit-order', async (req, res) => {
  try {
    console.log('Incoming order:', req.body); // ✅ Debug incoming payload

    const response = await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body)
    });

    const text = await response.text(); // 🔁 Temporarily use .text() to see raw error
    console.log('Google Script Response:', text);

    res.json(JSON.parse(text)); // Try to parse only after logging it
  } catch (err) {
    console.error('Proxy Error:', err.message);
    res.status(500).json({ status: 'error', message: 'Proxy failed', error: err.message });
  }
});


app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
