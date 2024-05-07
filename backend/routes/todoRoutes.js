import express from 'express';
import Todo from '../models/Todo.js';
import Project from '../models/Project.js';

const router = express.Router();

// Add a todo to a project
router.post('/:projectId', async (req, res) => {
    const todo = new Todo({
        description: req.body.description
    });
    try {
        const newTodo = await todo.save();
        const project = await Project.findById(req.params.projectId);
        project.todos.push(newTodo._id);
        await project.save();
        res.status(201).json(newTodo);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Update todo status
router.put('/:id', getTodo, async (req, res) => {
    if (req.body.status != null) {
        res.todo.status = req.body.status;
    }
    if (req.body.description != null) {
        res.todo.description = req.body.description;
    }
    res.todo.updatedDate = Date.now();
    try {
        const updatedTodo = await res.todo.save();
        res.json(updatedTodo);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete a todo
router.delete('/:id', getTodo, async (req, res) => {
    try {
        const deletedTodo = await Todo.findByIdAndDelete(req.params.id);
        if (!deletedTodo) {
            return res.status(404).json({ message: 'Todo not found' });
        }
        res.json({ message: 'Todo deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});
router.get('/:id', async (req, res) => {
    try {
      const todo = await Todo.findById(req.params.id);
      if (!todo) {
        return res.status(404).json({ message: 'Todo not found' });
      }
      res.json(todo);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

// Middleware function to get todo by ID
async function getTodo(req, res, next) {
    let todo;
    try {
        todo = await Todo.findById(req.params.id);
        if (todo == null) {
            return res.status(404).json({ message: 'Todo not found' });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
    res.todo = todo;
    next();
}

export default router;
