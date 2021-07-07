import 'dotenv/config'
import express from 'express';
import 'express-async-errors'
import { routes } from './routes';
import 'reflect-metadata'
import './database/index'

import { ErrorCatcher } from './middlewares/ErrorCatcher';

const PORT = process.env.PORT || 3333;
const app = express();

app.use(express.json())
app.use(routes)
// app.use(ErrorCatcher)

app.listen(PORT, () => console.log(`Server Started at port ${PORT}`));