const express = require('express');
const appRouter = express.Router();
const redisClient = require('../config/redis');
const User = require('../model');

const user = 'user:all';

appRouter.get('/', (req, res) => {
  res.send('Server up');
});

appRouter.get('/users', checkCache, async (req, res) => {
  const users = await User.find();
    redisClient.set(user, JSON.stringify(users));
    res.json({
      success: true,
      data: users
    });
});

appRouter.post('/user/save', async (req, res) => {
  const user = new User({
    title: 'rohan',
    content: 'software engineer'
  })
  await user.save();
  res.json({
    success: true,
    data: user
  });
});

function checkCache(req, res, next) {
  return redisClient.get(user, (err, users) => {
    if(users) {
      res.send({
        success: true,
        data: JSON.parse(users)
      })
    } else {
      next();
    }
  })
}

module.exports = appRouter;