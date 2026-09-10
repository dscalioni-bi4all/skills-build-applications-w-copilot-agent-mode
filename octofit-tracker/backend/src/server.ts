import express from 'express';

const app = express();
const port = 8000;

app.get('/api/health', (_request, response) => {
  response.json({ status: 'ok' });
});

app.listen(port, () => {
  console.log(`OctoFit API listening on port ${port}`);
});