import express from 'express'
import { postsRoutes } from './routes/postRoutes.js'
import { usersRoutes } from './routes/userRoutes.js'
const app = express()
import mongoose from 'mongoose'
import 'dotenv/config.js'
import path from 'path'
import {fileURLToPath} from 'url'
app.use(express.json())

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

app.use('/api/posts', postsRoutes)
app.use('/api/users', usersRoutes)

app.use(express.static(path.join(__dirname, '/client/dist')))

// render client for any path

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/dist/index.html'))
});


mongoose.connect(process.env.DB_URI, {dbName: 'demo_db'})
  .then(() => {
    console.log('Connected to DB successfuly')
    app.listen(4000, () => console.log('Listening to port 4000'))
  })
  .catch((err) => console.log(err));

