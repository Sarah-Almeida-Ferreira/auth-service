import dotenv from 'dotenv';
import connectDB from './config/db.config';
import authRoutes from './routes/auth.routes';
import express from 'express';
import swaggerDocs from './config/swagger.config'; 

dotenv.config();

const app = express();

app.use(express.json());
app.use('/auth', authRoutes);

swaggerDocs(app);
connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
