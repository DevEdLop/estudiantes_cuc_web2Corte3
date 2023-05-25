import express from 'express';
import authRoutes from './routes/auth.routes.js'
import { PORT } from './config.js';
const app = express();


//middleware
app.use(express.urlencoded({ extended: true }))
app.use(express.json())


//rutas
app.use('/api/auth', authRoutes)

app.listen(PORT, () => console.log(`Server listening on [${PORT} 😎🤙]`))
