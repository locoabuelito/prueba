const express = require('express');
const app = express();
const morgan = require('morgan');
const { promisify } = require('util');

const SERVER_PORT = 4500;

const {database} = require('../database/data');


// middleware, mensajes por consola
app.use(morgan('dev'));

// middleware para pasar al siguiente funcion
app.use((req, res, next)=>{
    next();
})


// Parsear todo lo que venga del middleware a JSON
app.use(express.json());
app.use(express.urlencoded({
    extended: true,
}));

// Importar rutas
app.use(require('../routes/route'));


// Config del server express
const server = async () =>{
    const port = process.env.SERVER_PORT || 4000
    await promisify(app.listen).bind(app)(port)
    console.log(`Server escuando en el puerto: ${port}`);
}

server();

/*
app.set('port', process.env.port || 4000);
const server = app.listen(port, (error) => {
    if (error) return console.log(`Error: ${error}`);

    console.log(`Server escuando en el puerto: ${server.address().port}`);
});*/