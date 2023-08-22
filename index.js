const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();

app.use(express.static('public'));

app.get('/api/google-maps-key', (req, res) => {
  res.send(process.env.GOOGLE_MAPS_API_KEY);
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});