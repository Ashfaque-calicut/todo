import express from 'express';
import cors from 'cors'
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import connectToMongoDb from './db/connectToMongoDb.js';
import authRoutes from './routes/authRoutes.js';
import projectRoutes from './routes/projectRoutes.js';
import todoRoutes from './routes/todoRoutes.js';


const app = express();

// Middleware
app.use(express.json());
app.use(bodyParser.json());
dotenv.config();
app.use(cors());


// Routes
app.use('/auth', authRoutes);
app.use('/projects', projectRoutes);
app.use('/todos', todoRoutes);



// Error handler middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
});
const PORT=process.env.PORT ;

app.listen(PORT,()=>{
    connectToMongoDb()
    console.log(`server runnuing successfully ${PORT}`)
});