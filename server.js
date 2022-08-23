const mongoose = require('mongoose')
const dotenv = require('dotenv')
const app = require('./app')

dotenv.config({path: './.env'})


const DB = process.env.MONGO_URI




mongoose.connect(DB, {}).then((conn) => { 
    console.log(conn.Connection)
  });


const PORT = process.env.PORT || 5000


app.listen(PORT, ()=>{
    console.log(`listening on port ${PORT}`)

})