

// -------------------------Original books script for reference----------------------

// Update for Dadirri
const router = require("express").Router();
const bookRoutes = require("./books");

// Book routes
router.use("/books", bookRoutes);

module.exports = router;

// -------DADIRRI SCRIPT-------------------------------------
// Update for Dadirri
// const router = require("express").Router();
// const entryRoutes = require("./entry");

// // Entry routes
// router.use("/entry", entryRoutes);

// module.exports = router;
