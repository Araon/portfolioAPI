const router = require("express").Router();

router.use("/", require("./api"))
router.use("/portfolio", require("./portfolio"))

module.exports = router;