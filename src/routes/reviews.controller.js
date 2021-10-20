const reviewsService = require("./reviews.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

function update ( req, res ) {
    const {reviewId} = req.params;
    const {data} = req.body;
    reviewsService
        .update(reviewId, data)
        .then(() => {
          reviewsService.get(reviewId)
            .then((data) => res.json({data}));
        })

}

function destroy ( req , res ) {
    const {reviewId} = req.params;
    reviewsService
        .destroy(reviewId)
        .then(data => res.status(204).json({data}));
}

function idCheck ( req, res, next){
    const {reviewId} = req.params;
    reviewsService
        .checkId(reviewId)
        .then((data) => {
            if(data.length !== 0){
                next();
            }
            else{
                next({
                    status: 404,
                    message: "Review cannot be found."
                })
            }
        });
}



module.exports = {
    update: [asyncErrorBoundary(idCheck), asyncErrorBoundary(update)],
    delete: [asyncErrorBoundary(idCheck), asyncErrorBoundary(destroy)]
}