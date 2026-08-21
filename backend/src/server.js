import express from 'express';
import filesRoutes from './routes/filesRoutes.js';

const app = express();
app.use(express.json());

app.use('/api/files', filesRoutes);

app.listen(3000, () => console.log('Backend running on port 3000'));
import express from 'express';
import cors from 'cors';
import projectsRoutes from './routes/projects.js';
import ordersRoutes from './routes/orders.js';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/projects', projectsRoutes);
app.use('/api/orders', ordersRoutes);

app.listen(4000, () => console.log('OceanAI backend on port 4000'));

import express from 'express';
import cors from 'cors';
import aiRoutes from './routes/ai.js';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/ai', aiRoutes);

app.listen(4000, () => console.log('OceanAI backend running on port 4000'));
