const express = require('express')
const cors = require('cors')

const app = express()

app.use(express.json())
app.use(cors())

// Middleware para la gestión de errores
app.use((err, req, res, next) => {
    res.status(500).json({ error: err.message });
})

app.use('/api', require ('./routes/api'))

module.exports = app