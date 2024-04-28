const express = require('express')
const router = express.Router()
const {ProjectModel} = require('../schema/project');
const {TaskModel} = require('../schema/task');

router.post('/', async (req, res) => {
  try {
    const project = await ProjectModel.create(req.body);
    res.json(project);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const projects = await ProjectModel.find().populate('tasks');
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const project = await ProjectModel.findById(req.params.id).populate('tasks');
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }
    res.json(project);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const project = await ProjectModel.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate('tasks');
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }
    res.json(project);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const project = await ProjectModel.findByIdAndDelete(req.params.id);
    await TaskModel.deleteMany({ _id: { $in: project.tasks } });
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }
    res.json({ message: 'Project deleted successfully', ...project._doc });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});
module.exports = router