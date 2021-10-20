const express = require("express");
const cors = require("cors");
const controller = require("./movies.controller")
const methodNotAllowed = require("../errors/methodNotAllowed");
const router = express.Router();

router  
    .route("/:movieId/theaters")
    .get(cors(), controller.readTheaters)
    .all(methodNotAllowed);

router  
    .route("/:movieId/reviews")
    .get(cors(), controller.readReviews)
    .all(methodNotAllowed);

router
    .route("/")
    .get(cors(), controller.list)
    .all(methodNotAllowed);

router
    .route("/:movieId")
    .get(cors(), controller.read)
    .all(methodNotAllowed);



    
module.exports = router;