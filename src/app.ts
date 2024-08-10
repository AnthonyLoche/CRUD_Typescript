import express from 'express';
import userRoutes from './routes/userRoutes';

const app = express();

app.use(express.json()); 
app.use('/api', userRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
