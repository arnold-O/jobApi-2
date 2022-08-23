const express = require('express')
const app = express()
const AuthRoute = require('./routes/authRoute')
const JobsRoute = require('./routes/jobRoute')
const globalErrorHandler = require('./controllers/errorController');
const authunticateUser = require('./middleware/authentication');

// security
const helmet = require('helmet')
const cors = require('cors')
const xss = require('xss-clean')
const rateLimit = require('express-rate-limit')

app.use(express.json());

app.set("trust proxy", 1);
app.use(rateLimit({
    windowMs: 60 * 1000,
    max: 60,
  }))
app.use(helmet())
app.use(cors())
app.use(xss())


app.get("/", (req, res) => {
    res.send('<h1>jobs-api</h1><a href="/api-docs">Documentation</a>');
  });
// routes

app.use('/api/v1/auth', AuthRoute)
app.use('/api/v1/job', authunticateUser, JobsRoute)


app.use(globalErrorHandler)


module.exports = app
