import express, { Request, Response } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import taskRouter from './routers/task';

require('dotenv').config();
import './db';

const PORT = process.env.PORT || 8080;

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.use('/task', taskRouter);

app.get('/', (req: Request, res: Response) => {
	res.send('Hello World!');
});

app.listen(PORT, () => console.log(`Server listening at http://localhost:${PORT}`));
