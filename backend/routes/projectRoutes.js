import express from 'express';
import Project from '../models/Project.js';

const router = express.Router();

// Get all projects
router.get('/all', async (req, res) => {
    try {
        const projects = await Project.find();
        res.json(projects);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Create a new project
router.post('/add', async (req, res) => {
    const project = new Project({
        title: req.body.title
    });
    try {
        const newProject = await project.save();
        res.status(201).json(newProject);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Get a specific project
router.get('/:id', getProject, (req, res) => {
    res.json(res.project);
});

// Middleware function to get project by ID
async function getProject(req, res, next) {
    let project;
    try {
        project = await Project.findById(req.params.id).populate('todos');
        if (project == null) {
            return res.status(404).json({ message: 'Project not found' });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
    res.project = project;
    next();
}
// Delete a specific project
router.delete('/:id', getProject, async (req, res) => {
    try {
        await res.project.deleteOne();
        res.json({ message: 'Project deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});



export default router;