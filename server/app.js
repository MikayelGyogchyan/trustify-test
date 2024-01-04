const express = require('express');
const fs = require('fs');

const app = express();

const logs = JSON.parse(
  fs.readFileSync(`./logs.json`)
)

app.get('/api/v1/logs', (req, res) => {
  res.status(200).json({
    status: 'success',
    results: logs.results,
    data: {
      logs
    }
  })
})

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});