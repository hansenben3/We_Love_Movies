const knex = require("../db/connection");
const mapProperties = require("../utils/map-properties");
const reduceProperties = require ("../utils/reduce-properties");

const reduceCritic = reduceProperties("review_id",{
  organization_name: ["critic", null, "organization_name"],
  preferred_name: ["critic", null, "preferred_name"],
  surname: ["critic", null, "surname"],
  
});

function sortData (data) {
      data.forEach(review => {
            review.critic = review.critic[0]
            return review;
      })
  return data
}


function list(is_showing) {
    if(is_showing){
      if(is_showing === true){
        return knex("movies_theaters as mt")
          .innerJoin("movies","mt.movie_id", "movies.movie_id")
          .select("*")
          .where("mt.is_showing", true);
      }
      else{
        return knex("movies_theaters as mt")
          .innerJoin("movies","mt.movie_id",
          "movies.movie_id")
          .select("*")
          .where("mt.is_showing", true)
          .groupBy("movies.movie_id");
      }
    }
    else{
        return knex("movies")
          .select("*");
    }
    
}

function read(id){
    return knex("movies")
      .select("*")
      .where("movie_id", id)
      .then((data) => data[0]);
}

function readReviews(id) {
    return knex("reviews")
        .innerJoin("critics", "reviews.critic_id", "critics.critic_id")
        .select("reviews.review_id","reviews.movie_id","critics.organization_name", "critics.surname", "critics.preferred_name")
        .where("reviews.movie_id", id)
        .then((data) => reduceCritic(data))
        .then((data) => sortData(data))
}

function readTheaters(id) {
    return knex("movies_theaters")
        .select("*")
        .innerJoin("theaters", "movies_theaters.theater_id",
        "theaters.theater_id")
        .where("movies_theaters.movie_id", id);
}


function checkId(id) {
    return knex("movies").select("*").where("movie_id", id);
}


module.exports = {
    list,
    read,
    checkId,
    readReviews,
    readTheaters
}