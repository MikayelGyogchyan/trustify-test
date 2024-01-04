const express = require('express');
const mongoose = require('mongoose');
const Log = require('./models/log');
const dotenv = require('dotenv');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

dotenv.config({ path: './config.env' });

// Conectar a MongoDB
const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then(() => console.log('DB connection successful!'));

app.get('/live', async (req, res) => {
  res.send('Welcome we are running');
});

app.get('/api/search', async (req, res) => {
  try {
    const results = await Log.find();
    res.json(results);
  } catch (error) {
    console.error('Error searching logs:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.post('/api/search', async (req, res) => {
  const { searchTerm } = req.body;
  try {
    const results = await Log.find({
      message: { $regex: searchTerm, $options: 'i' }
    });
    res.send(results);
  } catch (error) {
    console.error('Error searching logs:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Iniciar el servidor
const port = process.env.PORT || 8000;
const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

process.on('unhandledRejection', err => {
  console.log('UNHANDLED REJECTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
