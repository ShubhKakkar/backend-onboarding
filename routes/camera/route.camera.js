const express = require('express');
const authMiddleware = require('@middlewares/middleware.auth');
const { createCamera, fetchCamera, additionalDetails } = require('@controllers/camera/controller.camera');
const router = express.Router();

router.post('/create', authMiddleware, async (req, res) => {
  if (!req.user.id) {
    return { status: 400, error: 'User id missing!' };
  }
  const { status, data, error, details } = await createCamera({
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


router.post('/addDetails', authMiddleware, async (req, res) => {
  if (!req.user.id) {
    return { status: 400, error: 'User id missing!' };
  }
  const { status, data, error, details } = await additionalDetails({
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
  const { status, data, error, details } = await fetchCamera({
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