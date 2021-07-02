import express from 'express';

const PORT = process.env.PORT || 3333;
const app = express();

app.listen(PORT, () => console.log(`Server Started at port ${PORT}`));