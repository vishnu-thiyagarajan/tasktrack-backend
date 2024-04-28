const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const ProjectSchema = new mongoose.Schema({
    name: String,
    description: String,
    tasks: [{
      type: Schema.Types.ObjectId, 
      ref: 'tasks',
      required: false,
    }]
  });
const ProjectModel = mongoose.model("projects", ProjectSchema);

module.exports = {ProjectModel, ProjectSchema};