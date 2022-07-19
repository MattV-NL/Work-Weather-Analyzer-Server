const express = require('express');
const app = express();
const PORT = process.env.PORT || 8000;
const https = require('https');
const cors = require('cors');
require('dotenv').config();

// const corsOptions = {
//   origin: `http://localhost:8000/*`,
// };

app.use(cors());
app.use(express.json());
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

let lang = 'en';
let units = 'metric';
const key = process.env.API_KEY;
const lat = 47.63;
const lon = -52.64;

const options = {
  hostname: `api.openweathermap.org`,
  port: 443,
  path: `/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${key}&units=${units}&lang${lang}`,
  method: 'GET',
};

// working on getting position from client
app.post('/api/position', (req, res) => {
  console.log('i got a request');
  console.log(req.body);
  res.json({
    status: 'success',
  });
});
// end of new

app.get('/api/weather', (req, res) => {
  let data = '';
  const request = https.request(options, (response) => {
    console.log(`statusCode: ${res.statusCode}`);

    response.on('data', (d) => {
      process.stdout.write(d);
      data = data + d;
    });
  });

  request.on('end', () => {
    res.status(200).json(JSON.parse(data));
  });

  request.on('error', (err) => {
    console.error(err);
    res.status(500).send('internal server error');
  });

  request.end();
});
