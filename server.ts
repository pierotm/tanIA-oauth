import express from 'express';
import { oauthCallback, startOAuth } from './oauth';

const app = express();
const PORT = process.env.PORT || 3000;

// Inicia el flujo OAuth
app.get('/oauth2/start', startOAuth);

// Callback de Google
app.get('/oauth2/callback', oauthCallback);

app.listen(PORT, () => {
  console.log(`OAuth server listo en puerto ${PORT}`);
});
