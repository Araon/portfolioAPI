const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  const response = {
    success: true,
    data: {
      status: 'OK'
    }
  };
  res.status(200).json(response);
});

module.exports = router;
