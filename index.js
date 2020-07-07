const express = require('express');
const app = express();
const {Poblacion} = require('./models');
// para que express pueda leer json:
app.use(express.json());

app.get("/", function (req, res) {
    res.json("hola");
})

//para obtener datos de lectura sobre una entidad, utilizar el método GET
app.get("/poblaciones", function (req, res) {
    Poblacion.findAll()
    .then(poblaciones => res.json(poblaciones))
    .catch(err => res.json(err))
});

app.get("/poblaciones/:id", function (req, res) {
    const {id} = req.params;
    Poblacion.findOne({where: {id}})
    .then(poblacion => {
        if (poblacion) {
            res.json(poblacion);
        } else {
            res.status(404).json("Población no encontrada");
        }
    })
    .catch(err => res.json(err))
});

//para introducir entidades, utilizar el método POST
app.post("/poblaciones", function (req, res) {
    const poblacion = req.body;
    // en POSTMAN: 
    // Headers -> Content-Type - application/json
    // Body -> el contenido a enviar en json
    Poblacion.create(poblacion)
    .then(poblacion => res.status(201).json(poblacion))
    .catch(err => res.status(400).json(err.errors))
})

app.listen(3000);