import express from 'express';
import auth from './routes/api/v1/auth';
import users from './routes/api/v1/users';
import requests from './routes/api/v1/requests';

const app = express();

// Home Route
app.get('/', (req, res) => {
  res.status(200).json({
    status: 200,
    message: 'Maintenance Tracker API'
  });
});

// Use Routes
app.use('/api/v1/auth', auth);
app.use('/api/v1/users', users);
app.use('/api/v1/requests', requests);

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`Server running on port ${port}...`);
});

export default app;
