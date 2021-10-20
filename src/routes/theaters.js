const express = require("express");
const cors = require("cors");
const controller = require("./theaters.controller")
const methodNotAllowed = require("../errors/methodNotAllowed")
const router = express.Router();

router
    .route("/")
    .get(cors(), controller.list)
    .all(methodNotAllowed);

module.exports = router;