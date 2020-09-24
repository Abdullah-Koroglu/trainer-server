const express = require('express');
const mongoose = require('mongoose');
const requireAuth = require('../middlewares/requireAuth');

const Temp = mongoose.model('Temp');

const router = express.Router();

router.use(requireAuth);

router.get('/temps', async (req, res) => {
  const temps = await Temp.find({ userId: req.user._id });

  res.send(temps);
});

router.post('/temps', async (req, res) => {
  const { name, datas , level } = req.body;

  if (!name || !datas) {
    return res
      .status(422)
      .send({ error: 'You must provide a name and datas' });
  }

  try {
    const temp = new Temp({ name, datas, userId: req.user._id , level });
    await temp.save();
    res.send(temp);
  } catch (err) {
    res.status(422).send({ error: err.message });
  }
});

module.exports = router;
