const knex = require("../db/connection");
const reduceProperties = require("../utils/reduce-properties");

const reduceCritic = reduceProperties("critic_id",{
      "organization_name" : ["critic", null, "organization_name"],
      "preferred_name" : ["critic", null, "preferred_name"],
      "surname" : ["critic", null, "surname"],
});

function fixData (data) {
  data = data[0]
  data.critic = data.critic[0];
  return data;
}

function get(id) {
  return knex("reviews")
    .join("critics", "reviews.critic_id", "critics.critic_id")
    .select("reviews.content", "reviews.created_at", "reviews.updated_at", "critics.preferred_name", "critics.surname", "critics.organization_name", "reviews.critic_id", "reviews.movie_id", "reviews.review_id", "reviews.score")
    .where("reviews.review_id", id)
    .then((data) => reduceCritic(data))
    .then((data) => fixData(data))
}

function update(id, data) {
  return knex("reviews")
    .join("critics", "reviews.critic_id", "critics.critic_id")
    .update({
    score: data.score,
    content: data.content,
    updated_at: knex.fn.now()
    }, ["*"])
    .where("reviews.review_id", id)
}

function destroy(id) {
    return knex("reviews")
      .del("*")
      .where("review_id", id);
}

function checkId(id){
    return knex("reviews")
      .select("*")
      .where("review_id", id);
}

module.exports = {
    update,
    destroy,
    checkId,
    get
}