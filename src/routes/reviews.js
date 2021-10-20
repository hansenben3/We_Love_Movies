const express = require("express");
const cors = require("cors");
const controller = require("./reviews.controller")
const methodNotAllowed = require("../errors/methodNotAllowed")
const router = express.Router();

router
    .route("/:reviewId")
    .put(cors(), controller.update)
    .delete(cors(), controller.delete)
    .all(methodNotAllowed);

module.exports = router;