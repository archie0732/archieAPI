import { doujinAPI } from './nhentai/album';
import { artistAPI } from './nhentai/artist';
import { doiujinSearchAPI } from './nhentai/search';

import express from 'express';
import cors from 'cors';

const app = express();

app.use(
  cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  }),
);

// artist
app.get('/api/nhentai/artist', async (req, res) => {
  const artist = req.query['artist'];

  if (typeof artist !== 'string') {
    res.status(400);
    return;
  }

  const data = await artistAPI(artist);

  res.json(data);
});

// doujin id
app.get('/api/nhentai/doujin/:id', async (req, res) => {
  const id = req.params['id'];

  if (typeof id !== 'string') {
    res.status(400);
    return;
  }
  const doiujin = await doujinAPI(id);
  res.json(doiujin);
});

app.get('/api/nhentai/search', async (req, res) => {
  const keyword = req.query['q'];

  if (typeof keyword !== 'string') {
    res.status(400);
    return;
  }
  const doiujin = await doiujinSearchAPI(keyword);
  res.json(doiujin);
});

// home pages
app.get('/api', (_, res) => {
  res.json({
    title: 'Welcome to Archie API',
    text: 'use /api/nhentai?artist= to get artist api',
  });
});

app.listen(3001, () => {
  console.log('Server is running on http://localhost:3001/api');
});
