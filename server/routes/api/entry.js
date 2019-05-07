// ----------------DADIRRIS SCSRIPT------------------------------------------------------------

// "entries" api file does not exist yet to avoid causing app issues by renaming files in the existing structure. 
// can go back and adjust file names after more comfortable with code
const router = require("express").Router();
const entryController = require('./../../controllers/entryController');
// Matches with "/api/entry"
// Do we need a find all in this context? Would we ever need to retrieve more than one entry at a time?
router.route("/create")
  .post(entryController.createEntry);

// Matches with "/api/entry/:id"
router
  .route("/:id")
  .get(entryController.findById)
  .put(entryController.update)
  .delete(entryController.remove);

module.exports = router;