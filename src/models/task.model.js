const mongoose = require('mongoose');

const taskSchema = mongoose.Schema({
    taskName: { type: String, required: true },
    day: { type: String, required: true },
    time: { type: String, required: true },
    userId:{ required:true, type: mongoose.Schema.Types.ObjectId, ref: 'user' },
},{
        versionKey: false,
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        }
    })
const TaskModel = mongoose.model('task',taskSchema);
module.exports = TaskModel;