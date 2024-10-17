import express from 'express'
import cors from 'cors'
import { readJSON } from './utils.js'

const personas = readJSON('./personas.json')

const app = express()
app.use(express.json())
app.use(cors())
const port = 1234

app.get('/person', (req, res) => {
  res.status(200).json(personas)

  res.status(500).json({ message: 'Error en el servidor' })
})

app.post('/person', (req, res) => {
  const result = req.body

  if (result.error) {
    return res.status(400).json({ error: JSON.parse(result.error.message) })
  }

  const newPerson = {
    id: +1,
    ...result.data
  }
  personas.push(newPerson)
  res.status(200).json(newPerson)
})

app.listen(port, () => {
  console.log(`Server listen on port: http://localhost:${port}`)
})
