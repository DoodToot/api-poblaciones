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
});

//para modificar entidades, utilizar el método PUT
app.put("/poblaciones/:id", function (req, res) {
    // params : parámetros de la ruta:
    const {id} = req.params;
    // body : datos del cuerpo:
    const nuevosDatos = req.body;
    Poblacion.findOne({where: {id}})
    .then(poblacion => {
        // asignamos(assign) los campos de "nuevosDatos" a "poblacion":
        Object.assign(poblacion, nuevosDatos);
        // guardamos los nuevos datos:
        poblacion.save()
        // generamos la respuesta:
        .then (poblacion => res.json(poblacion))
    })
    .catch(err => res.status(400).json(err))
});

app.listen(3000);