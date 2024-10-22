var express = require('express');
var router = express.Router();
const path = require('path');

router.get('/', async (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

router.get('/admin', async (req, res) => {
  res.sendFile(path.join(__dirname, '../public/admin.html'));
});

module.exports = router;