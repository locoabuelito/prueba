const controller = {};

const pool = require('../database/config');

// Listar todos los usuarios
controller.list = async (request, response)=>{
    await pool.query('SELECT * FROM user', (err, result) => {
        if (err) throw err;

        response.status(200).send(result);
    });
}

// Crear usuario
controller.create = async (request, response) =>{
    const data = request.body;
    await  pool.query('INSERT INTO user set ?', data, (err, result) => {
        console.log(result);
        if(err.code === 'ER_DUP_ENTRY'){
            console.error('Usuario repetido');
            response.status(500).send('Usuario con email repetido');
        }else{
            response.status(201).send(`Usuario ingresado: ${data}`);
        }
    });
}

// Editar usuario
controller.update = (req, res) => {
    const { id } = req.params;
    req.getConnection((err, conn) => {
  
        pool.query('SELECT * FROM user = ?', [id], (err, rows) => {
                res.render('user_edit', {
                    data: rows[0]
                })
            });
        });
}

controller.edit = async (req, res)=>{
    const { id } = req.params;
    const new_user = req.body;
    pool.query('UPDATE user SET ? WHERE id = ?', [new_user, id], (err, result) => {
        if (err) throw err;

        res.status(201).send(`Usuario actualizado:  ${new_user}`);
    });
}

// Eliminar usuario (is_active=0)
controller.delete = async (req, res)=>{
    const { id } = req.params;
    pool.query('UPDATE user SET is_active = 0 WHERE iduser = ?', [id], (error, result) => {
        if (error) throw error;
        res.status(200).send(`Usuario eliminado`);
    });
}

// Listar todos los usuarios por ciudad
controller.city = async (request, response)=>{
    await pool.query('select u.user_email, c.ciudad from ciudad c, user u where c.idciudad = u.idciudad;', (err, result) => {
        if (err) throw err;

        response.status(200).send(result);
    });
}


// Listar todos los usuarios activos
controller.city = async (request, response)=>{
    await pool.query('select u.user_email, c.ciudad from ciudad c, user u where c.idciudad = u.idciudad;', (err, result) => {
        if (err) throw err;

        response.status(200).send(result);
    });
}

module.exports = controller;
