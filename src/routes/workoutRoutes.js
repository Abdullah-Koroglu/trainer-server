const express = require('express');
const mongoose = require('mongoose');
const requireAuth = require('../middlewares/requireAuth');

const Workout = mongoose.model('Workout');

const router = express.Router();

router.use(requireAuth);

router.post('/getUserWorkouts', async (req, res) => {
  const workouts = await Workout.find({ userId: req.user._id });

  res.send(workouts);
});

router.post('/deleteWorkout/:id', async (req, res) => {
  Workout.findByIdAndRemove({_id: req.params.id}).then(workouts =>{
    res.send(workouts)
  })
});

router.post('/saveUserWorkout', async (req, res) => {
  const { name, datas } = req.body;
  const date = Date()


  if (!name || !datas) {
    return res
      .status(422)
      .send({ error: 'You must provide a name and datas' });
  }

  try {
    const workout = new Workout({ name, datas, userId: req.user._id , date});
    await workout.save();
    res.send(workout);
  } catch (err) {
    res.status(422).send({ error: err.message });
  }
});

module.exports = router;
