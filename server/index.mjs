import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';

const app = express();
const PORT = 3000;

const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyydToT9NVHJCVtFlPjEvoJfqGTy0x7QxZJzE7-AJLXleXb95a_V_ioul6NN5MZXuNsGQ/exec';
app.use(cors({
  origin: ['http://localhost:5173', 'https://flexxmasterapparel.vercel.app'],
  methods: ['POST'],
  credentials: true
}));

app.use(express.json());
app.post('/submit-order', async (req, res) => {
  try {
    console.log('Received order:', req.body);

    const params = new URLSearchParams();
    params.append('data', JSON.stringify(req.body)); // pass the full object as a string

    const response = await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      body: params
    });


    const text = await response.text();
    console.log('Google Script response:', text);

    const result = JSON.parse(text);
    res.json(result); // return the script’s status back to frontend
  } catch (err) {
    console.error('Server Error:', err.message);
    res.status(500).json({ status: 'error', message: 'Failed to submit order' });
  }
});



app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
