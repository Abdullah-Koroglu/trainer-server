const express = require('express');
const mongoose = require('mongoose');
const requireAuth = require('../middlewares/requireAuth');

const Temp = mongoose.model('Temp');

const router = express.Router();

router.use(requireAuth);

router.post('/getUserTemplate', async (req, res) => {
  const temps = await Temp.find({ userId: req.user._id });

  res.send(temps);
});

router.post('/deleteTemplate/:id', async (req, res) => {
  //delete
  Temp.findByIdAndRemove({_id: req.params.id}).then(temps =>{
    res.send(temps)
  })
});

router.post('/saveUserTemplate', async (req, res) => {
  const { name, datas } = req.body;
  const date = Date()

  if (!name || !datas) {
    return res
      .status(422)
      .send({ error: 'You must provide a name and datas' });
  }

  try {
    const temp = new Temp({ name, datas, userId: req.user._id , date });
    await temp.save();
    res.send(temp);
  } catch (err) {
    res.status(422).send({ error: err.message });
  }
});

module.exports = router;
