const express = require('express')
const app = express()
const PORT = 3000
const cors = require('cors')
const router = require('./routes')

app.use(express.urlencoded({extended : false}))
app.use(express.json())
app.use(cors())

app.use(router)

app.listen(PORT, () => {
    console.log(`Currently listening to PORT: ${PORT}`)
})