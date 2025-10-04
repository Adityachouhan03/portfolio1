import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

const app = express();
app.use(helmet());
app.use(cors({ origin: process.env.CORS_ORIGIN?.split(',') || true }));
app.use(express.json());
app.use(morgan('tiny'));

app.get('/', (_req, res) => res.json({ ok: true }));

app.post('/contact', async (req, res) => {
	const { name, email, message } = req.body || {};
	if (!name || !email || !message) return res.status(400).json({ error: 'Missing fields' });
	// In real deployment, send to email or ticketing. Placeholder logs safely.
	console.log('CONTACT_FORM', { name, email, message: message.slice(0, 500) });
	return res.json({ ok: true });
});

const port = Number(process.env.PORT || 3001);
app.listen(port, () => console.log(`API running on :${port}`));


