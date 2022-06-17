require('dotenv').config();

/* 
for mysql instead mariaDB
const mysql = require('mysql');
const util = require('util')

const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "nopw",
    database: "hack",
    connectionLimit: 5
  });
 
  pool.query = util.promisify(pool.query);
  
  pool.getConnection(function(err) {
    if (err) throw err;
    console.log("Connected with DB!");
  });

  module.exports = pool;
 */
const mariadb = require('mariadb');

const pool = mariadb.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PW,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    connectionLimit: 5
});

// Connect and check for errors
pool.getConnection((err, connection)=>{
    if(err){
        if(err.code === 'PROTOCOL_CONNECTION_LOST'){
            console.log('Database connection lost');
        }
        if(err.code === 'ER_CON_COUNT_ERROR'){
            console.log('Database has too many connections');
        }
        if(err.code === 'ECONNREFUSED'){
            console.log('Database connection was refused');
        }
    }
    if(connection) connection.release();

    return;
});

module.exports = pool;