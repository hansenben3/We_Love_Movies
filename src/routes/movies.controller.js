const moviesServices = require("./movies.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

function list( req, res ) {
    if(req.query.is_showing){
        moviesServices
        .list(req.query.is_showing)
        .then((data) => res.json({ data }))
    }
  else{
    moviesServices
      .list()
      .then((data) => res.json({ data }))
  }
}

function idCheck ( req, res, next){
    const id = req.params.movieId;
    moviesServices
        .checkId(id)
        .then((data) => {
            if(data.length !== 0){
                next();
            }
            else{
                next({
                    status: 404,
                    message: "Movie cannot be found."
                })
            }
        });
}

function read ( req, res) {
    const {movieId} = req.params;
    moviesServices
        .read(movieId)
        .then((data) => res.json({data}));
}

function readTheaters ( req, res, next ) {
    const {movieId} = req.params;
    moviesServices
        .readTheaters(movieId)
        .then((data) => res.json({data}))
        .catch(next)
}

function readReviews ( req, res, next ) {
    const {movieId} = req.params;
    moviesServices
        .readReviews(movieId)
        .then((data) => res.json({data}))
        .catch(next)
}


module.exports = {
    list: asyncErrorBoundary(list),
    read: [asyncErrorBoundary(idCheck), asyncErrorBoundary(read)],
    readTheaters: [asyncErrorBoundary(idCheck), asyncErrorBoundary(readTheaters)],
    readReviews: [asyncErrorBoundary(idCheck), asyncErrorBoundary(readReviews)],
}