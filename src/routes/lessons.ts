// src/routes/lessons.ts

import { Hono } from 'hono'
import { postLesson, getAllLessons } from '../handlers/lessonsHandler'


const lessonsRoutes = new Hono()

// POST /lessons  → create a new lesson entry
lessonsRoutes.post('/', postLesson)
// GET /lessons  → retrieve all lesson entries for public display board
lessonsRoutes.get('/', getAllLessons)

export default lessonsRoutes
