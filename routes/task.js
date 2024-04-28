const express = require('express')
const router = express.Router()
const {TaskModel} = require('../schema/task');
const { ProjectModel } = require('../schema/project');

router.post('/:projectId', async (req, res) => {
    try {
      const task = await TaskModel.create({ ...req.body, project: req.params.projectId });
      await ProjectModel.updateOne({ _id: req.params.projectId }, {$push: { tasks: task._id } })
      res.json(task);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
});

router.get('/', async (req, res) => {
    try {
      const tasks = await TaskModel.find();
      res.json(tasks);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
});

router.get('/all/:projectId', async (req, res) => {
    try {
      const tasks = await TaskModel.find({ project: req.params.projectId });
      res.json(tasks);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
});
router.get('/:id', async (req, res) => {
  try {
    const task = await TaskModel.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.json(task);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
})

router.put('/:id', async (req, res) => {
    try {
      const task = await TaskModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!task) {
        return res.status(404).json({ error: 'Task not found' });
      }
      res.json(task);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });
  
router.delete('/:id', async (req, res) => {
    try {
      const task = await TaskModel.findByIdAndDelete(req.params.id);
      if (!task) {
        return res.status(404).json({ error: 'Task not found' });
      }
      await ProjectModel.updateOne({ _id: req.params.projectId }, {$pull: { tasks: task._id } })
      res.json({ message: 'Task deleted successfully', ...task._doc });
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  });

module.exports = router
