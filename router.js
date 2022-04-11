const { Pool } = require("pg");
const pool = new Pool({
  database: 'react-mvp'
});
module.exports = pool;