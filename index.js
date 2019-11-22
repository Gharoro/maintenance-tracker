import express from 'express';

const app = express();

app.get('/', (req, res) => {
  res.send('Maintenance Tracker API');
});

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`Server running on port ${port}...`);
});