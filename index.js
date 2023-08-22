import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(express.static('public'));

app.get('/api/google-maps-key', (req, res) => {
  res.send(process.env.GOOGLE_MAPS_API_KEY);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
