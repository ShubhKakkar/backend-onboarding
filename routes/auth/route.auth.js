const express = require('express');
const router = express.Router();
const { createUser, getUserByEmail, listUsers } = require('@controllers/auth/controller.auth');

router.post('/users', async (req, res) => {
  const { status, data, error, details } = await createUser(req.body);
  if (status === 201) {
    res.status(201).json(data);
  } else {
    res.status(status).json({ error, details });
  }
});

router.get('/users/:email', async (req, res) => {
  const { status, data, error, details } = await getUserByEmail(req.params.email);
  if (status === 200) {
    res.status(200).json(data);
  } else {
    res.status(status).json({ error, details });
  }
});

router.get('/users', async (req, res) => {
  const { status, data, error, details } = await listUsers();
  if (status === 200) {
    res.status(200).json(data);
  } else {
    res.status(status).json({ error, details });
  }
});

module.exports = router;