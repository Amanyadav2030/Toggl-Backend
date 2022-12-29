const mongoose = require('mongoose'); 
const projectSchema = mongoose.Schema({
    userId:{ type: mongoose.Schema.Types.ObjectId, ref: 'user',required:true },
    projectName: { type: String, required: true, unique: true },
    client: { type: String },
    private: { type: Boolean, required: false },
},{
        versionKey: false,
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        }
    })
const ProjectModel = mongoose.model('project',projectSchema);
module.exports = ProjectModel;