import express from 'express';
import 'reflect-metadata'
import './database/index'

const PORT = process.env.PORT || 3333;
const app = express();

app.use(express.json())

app.listen(PORT, () => console.log(`Server Started at port ${PORT}`));