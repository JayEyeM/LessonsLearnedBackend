// File path: src/index.ts



import 'dotenv/config'
import { Hono } from 'hono'
import lessonsRoutes from './routes/lessons.js'  
import { cors } from 'hono/cors'

const app = new Hono()

app.use('*', cors({
  origin: 'https://lessonslearnedapp-1.onrender.com',
  allowMethods: ['GET', 'POST'],
}))


// Base test route
app.get('/', (c) => c.text('Hello from the backend!'))

// lessons routes
app.route('/lessons', lessonsRoutes)

export default app
