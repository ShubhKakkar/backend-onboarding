const express = require('express');
const authMiddleware = require('@middlewares/middleware.auth');
const { createStore } = require('@controllers/store/controller.store');
const { fetchStore } = require('../../controllers/store/controller.store');
const router = express.Router();

router.post('/create', authMiddleware, async (req, res) => {
  if (!req.user.id) {
    return { status: 400, error: 'User id missing!' };
  }
  const { status, data, error, details } = await createStore({
    userId: req.user.id,
    ...req.body
  });
  if (status === 200) {
    res.status(200).json(data);
  }
  else {
    res.status(status).json({ error, details })
  }
});

router.get('/find', authMiddleware, async (req, res) => {
  if (!req.user.id) {
    return { status: 400, error: 'User id missing!' };
  }
  const { status, data, error, details } = await fetchStore({
    userId: req.user.id,
  });
  if (status === 200) {
    res.status(200).json(data);
  }
  else {
    res.status(status).json({ error, details })
  }
});

module.exports = router;