const express = require("express");
const router = express.Router();

const taskModel = require("../models/taskModel");

router.get("/all", async (req, res) => {
  const tasks = await taskModel.find({})
  res.send(tasks);
});

// New task
router.post("/new", async (req, res) => {
  
  const task = new taskModel({
    name: req.body.name
  });
  await task.save()

  res.send(`Task saved - ${task}`)
});

// EDIT Task
router.put("/edit/:id", async (req, res) => {
  const updatedTask = await taskModel.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name },

    // Return new task value
    { new: true }
  );

  res.send(`Task updated`);
});

// CHEKCK/UNCHECK Task
router.put("/check/:id", async (req, res) => {
  const updatedTask = await taskModel.findById(req.params.id);

  // Verify and change the "done" state
  if (updatedTask.done) {
    await taskModel.findByIdAndUpdate(req.params.id, { done: false });
  } else {
    await taskModel.findByIdAndUpdate(req.params.id, { done: true });
  }

  res.end();
});


// Clear checked tasks
router.get("/clear", async (req, res) => {
  await taskModel.deleteMany({ done: true });
  res.send("Tasks limpas");
});

module.exports = router;
