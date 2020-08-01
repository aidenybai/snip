require('dotenv').config();

module.exports = {
  PORT: process.env.PORT,
  MONGO_URL: process.env.MONGO_URL,
  SECRET: process.env.SECRET,
};
