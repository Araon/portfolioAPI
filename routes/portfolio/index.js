const router = require("express").Router();

router.use("/", require("./portfolio"));
router.use("/", require("./trade"));


module.exports = router;