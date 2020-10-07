const express = require('express');
const mongoose = require('mongoose');
const requireAuth = require('../middlewares/requireAuth');

const Profile = mongoose.model('Profile');

const router = express.Router();

router.use(requireAuth);

router.post('/getUserProfile', async (req, res) => {
  const profile = await Profile.find({ userId: req.user._id });

  res.send(profile);
})

router.post('/updateProfile', async (req, res) => {
  const { name, age } = req.body;
  const profile = await Profile.find({ userId: req.user._id });
if ( profile !== []){
  try {
    const profile = new Profile({ name, age, userId: req.user._id });
    await profile.save();
    res.send(profile);
  } catch (err) {
    res.status(422).send({ error: err.message });
  }
}else{
  req.body.name ? 
  profile[0].name= req.body.name:
  null

  req.body.age ? 
  profile[0].age= req.body.age:
  null

  await profile[0].save()
  res.send(profile[0]);
}
  
});

module.exports = router;
