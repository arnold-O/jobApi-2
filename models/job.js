const mongoose = require('mongoose')


const jobsSchema = new mongoose.Schema({
    company:{
        type:String,
        required:[true,'please provide company name']
    },
    position:{
        type:String,
        required:[true,'please provide position'],
        maxlength:100
    },
    status:{
        type:String,
        enum:['interview', 'declined', 'pending'],
        default:"pending"
    },
    createdBy:{
        type:mongoose.Types.ObjectId,
        ref:"User",
        required:[true, 'please provide a user']
    }
}, {timestamps:true})


module.exports = mongoose.model('Job', jobsSchema)