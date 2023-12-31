const Sequelize = require('sequelize');
require('dotenv').config();

let sequelize;

if (process.env.JAWSDB_URL) {
  // Use the JawsDB URL for the database connection when running on Heroku
  sequelize = new Sequelize(process.env.JAWSDB_URL, {
    dialect: 'mysql',
  });
} else {
  // Use the local database credentials when running locally
  sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: 'localhost',
    dialect: 'mysql',
    port: 3306,
  });
}

module.exports = sequelize;