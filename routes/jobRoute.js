const express = require('express')
const { createJob, getAllJobs, getJob, updateJob, deleteJob } = require('../controllers/jobscontroller')
const router = express.Router();




router.route('/').post(createJob).get(getAllJobs)

router.route('/:id').get(getJob).patch(updateJob).delete(deleteJob)



module.exports = router