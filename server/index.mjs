import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';

const app = express();
const PORT = 3000;

const scriptMap = {
  Flahive: 'https://script.google.com/macros/s/AKfycbzSvQpqbYC3ZZlMWN5_wucb5t0JcrEcMBzPWn9Tval-5xmAfKcan3Um2ZZOGSH8x1Qm/exec',
  Flexx: 'https://script.google.com/macros/s/AKfycbxoKmoHzC7aL9P1fMa1vJpS6HIH6pD1BZuUagtUCOn2SnbKGbmeFYFRZCEfn7iOR0LJ/exec'
};

app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://flexxmasterapparel.vercel.app',
    'https://www.flahiveapparel.com',
    'https://www.flexxpersonaltrainingapparel.com'
  ],
  methods: ['POST'],
  credentials: true
}));

app.use(express.json());

app.post('/submit-order', async (req, res) => {
  const location = req.body.location;
  const scriptUrl = scriptMap[location];

  if (!scriptUrl) {
    return res.status(400).json({ status: 'error', message: 'Unknown location' });
  }

  try {
    console.log('Received order:', req.body);

    const params = new URLSearchParams();
    params.append('data', JSON.stringify(req.body));

    const response = await fetch(scriptUrl, {
      method: 'POST',
      body: params
    });

    const text = await response.text();
    console.log('Google Script response:', text);

    const result = JSON.parse(text);
    res.json(result);
  } catch (err) {
    console.error('Server Error:', err.message);
    res.status(500).json({ status: 'error', message: 'Failed to submit order' });
  }
});

app.get('/', (req, res) => {
  res.send('Flexx Order API is live ✅');
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
