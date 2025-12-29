import express from 'express';
import { oauthCallback, startOAuth } from './oauth.js';

const app = express();
const PORT = 3000;

// Inicia el flujo OAuth
app.get('/oauth2/start', startOAuth);

// Callback de Google
app.get('/oauth2/callback', oauthCallback);

app.listen(PORT, () => {
  console.log(`OAuth server listo en http://localhost:${PORT}`);
  console.log(`Inicia OAuth en: http://localhost:${PORT}/oauth2/start`);
});
