const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Log = require('../models/log');

dotenv.config({ path: './config.env' });

// Conectar a MongoDB
const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

try {
  console.log('Start!');
  (async () => {
    mongoose.connect(DB, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false
    });

    const parsedJson = fs
      .readFileSync('./logs.json', 'utf8')
      .split('\n')
      .map(line => {
        const { dt, message, syslog: { host } } = JSON.parse(line);
        return { host, dt, message };
      });

    for await (const line of parsedJson) {
      const addedLine = await Log(line).save();
      console.log(`succesfully saved ${addedLine.host}`);
    }

    console.log('Finised!');
  })();
} catch (error) {
  console.log('Error!');
}
