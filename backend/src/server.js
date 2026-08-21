import express from 'express';
import filesRoutes from './routes/filesRoutes.js';

const app = express();
app.use(express.json());

app.use('/api/files', filesRoutes);

app.listen(3000, () => console.log('Backend running on port 3000'));
