
exports.up = function(knex) {
  return knex.schema.createTable("movies_theaters", (table) => {
    table.integer("movie_id").references("movie_id").inTable("movies");
    table.integer("theater_id").references("theater_id").inTable("theaters");
    table.boolean('is_showing');
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
});
};

exports.down = function(knex) {
  return knex.schema.dropTable("movies_theaters");
};
