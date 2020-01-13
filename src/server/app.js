const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/user')
var cors = require('cors')

const app = express()

app.use(cors()) 
app.use(express.json())

app.use(userRouter)

app.listen(process.env.PORT || 8081);