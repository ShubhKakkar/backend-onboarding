const express = require('express');
const router = express.Router();
const { createUser, loginUser } = require('@controllers/auth/controller.auth');

router.post('/auth/sign-up', async (req, res) => {
  const { status, data, error, details } = await createUser(req.body);
  if (status === 201) {
    res.status(201).json(data);
  } else {
    res.status(status).json({ error, details });
  }
});

router.post('/auth/sign-in', async (req, res) => {
  const { status, data, error, details } = await loginUser(req.body);
  if (status === 200) {
    res.status(200).json(data);
  }
  else {
    res.status(status).json({ error, details })
  }
})

module.exports = router;