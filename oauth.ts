import { Request, Response } from 'express';
import { google } from 'googleapis';
import dotenv from 'dotenv';

dotenv.config();

const CLIENT_ID = process.env.GOOGLE_CLIENT_ID!;
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET!;
const REDIRECT_URI = process.env.GOOGLE_REDIRECT_URI!;

const oauth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);

// Paso 1: redirigir a Google
export const startOAuth = (_req: Request, res: Response) => {
  const authUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    prompt: 'consent',
    scope: [
      'https://www.googleapis.com/auth/drive',
      'https://www.googleapis.com/auth/gmail.send'
    ]
  });

  res.redirect(authUrl);
};

// Paso 2: Google regresa aquí
export const oauthCallback = async (req: Request, res: Response) => {
  const code = req.query.code as string;

  if (!code) {
    return res.status(400).send('No se recibió el authorization code');
  }

  try {
    const { tokens } = await oauth2Client.getToken(code);

    console.log('==============================');
    console.log('REFRESH TOKEN OBTENIDO');
    console.log(tokens.refresh_token);
    console.log('==============================');

    res.send(`
      <h2>Autorización completada</h2>
      <p>Puedes cerrar esta ventana.</p>
      <p>El refresh token se imprimió en consola.</p>
    `);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error obteniendo tokens');
  }
};
