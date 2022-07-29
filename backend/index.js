//
// import connectToMongo from "./db";

const connectToMongo = require('./db')
const express = require('express')
var cors = require('cors')
const app = express()
const port = 5000


app.use(cors())


connectToMongo();


//middelware req.body mate
app.use(express.json());

// availble routes
app.use('/api/auth',require('./Routes/auth'))
app.use('/api/notes',require('./Routes/notes'))
app.use('/api/contact',require('./Routes/contact'))


app.listen(port, () => {
  console.log(`Cnotebook listening on port ${port}`)
})
