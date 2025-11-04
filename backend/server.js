// Minimal Express server for contact form submissions
// Database: MongoDB
// DB name: bloodgrp, Collection: messages

import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { MongoClient } from 'mongodb';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017';
const DB_NAME = 'bloodgrp';
const COLLECTION = 'messages';

let client;
let db;
let messages;

async function connectDB() {
  if (db) return db;
  client = new MongoClient(MONGODB_URI, {
    // keep connection options minimal and compatible
  });
  await client.connect();
  db = client.db(DB_NAME);
  messages = db.collection(COLLECTION);
  return db;
}

app.get('/api/health', async (_req, res) => {
  try {
    await connectDB();
    res.json({ ok: true, db: DB_NAME });
  } catch (err) {
    res.status(500).json({ ok: false, error: 'DB connection failed' });
  }
});

app.post('/api/contact', async (req, res) => {
  const { name, email, subject, message } = req.body || {};

  // basic validation
  if (!name || !email || !subject || !message) {
    return res.status(400).json({ error: 'All fields (name, email, subject, message) are required.' });
  }
  const emailOk = /.+@.+\..+/.test(email);
  if (!emailOk) {
    return res.status(400).json({ error: 'Invalid email format.' });
  }

  try {
    await connectDB();
    const doc = {
      name: String(name).trim(),
      email: String(email).trim().toLowerCase(),
      subject: String(subject).trim(),
      message: String(message).trim(),
      userAgent: req.headers['user-agent'] || null,
      ip: req.headers['x-forwarded-for']?.toString().split(',')[0]?.trim() || req.socket.remoteAddress || null,
      createdAt: new Date(),
    };

    const result = await messages.insertOne(doc);
    return res.status(201).json({ id: result.insertedId, ok: true });
  } catch (err) {
    console.error('Failed to save message', err);
    return res.status(500).json({ error: 'Failed to save message' });
  }
});

// 404 for unknown API routes
app.use('/api', (_req, res) => {
  res.status(404).json({ error: 'Not found' });
});

// start server
app.listen(PORT, () => {
  console.log(`Backend listening on port ${PORT}`);
});

// graceful shutdown
process.on('SIGINT', async () => {
  try {
    await client?.close();
  } finally {
    process.exit(0);
  }
});

