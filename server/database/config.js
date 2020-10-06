const mysql = require('mysql');
const { database } = require('./data');

const {promisify} = require('util'); // Para convertir los callback a promesas

// Pool de conexiones a mysql
const pool = mysql.createPool(database);

// Conectamos a la bd
pool.getConnection((err, conn)=>{
    if(err){
        if(err.code === 'PROTOCOL_CONNECTION_LOST'){
            console.error('Conexión a la base de datos cerrada');
        }
        if(err.code === 'ER_CON_COUNT_ERROR'){
            console.error('La base de datos tiene muchas conexiones abiertas');
        }
        if(err.code === 'ECONNREFUSED'){
            console.error('Conexión a la base de datos rechazada');
        }
    }
    if(conn){
        conn.release();
        console.log('Conectado a la base de datos');
        return; 
    } 
});

// Convertimos a promesas las futuras query's
pool.query = promisify(pool.query);
module.exports = pool;