const router = require("express").Router();

router.use("/", require("./portfolio"));

// router.use("/holdings", require("./holdings"));
// router.use("/returns", require("./returns"));
router.use("/addTrade", require("./trade"));
// router.use("/updateTrade", require("./trade"));
// router.use("/removeTrade", require("./trade"));


module.exports = router;


