import mongoose from 'mongoose'

const taskSchema = new mongoose.Schema({
    isTrue: Boolean,
    isFalse: Boolean,
    challenge: {
        type: mongoose.Types.ObjectId,
        ref: "Challenge"
    }
}, {timestamps: true})

const taskModel = mongoose.model("Task", taskSchema)

export default taskModel