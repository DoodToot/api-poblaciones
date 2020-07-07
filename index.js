const express = require('express')
const app = express()
const {Poblacion} = require('./models')

app.get("/", function (req, res) {
    res.json("hola");
})


app.get("/poblaciones", function (req, res) {
    Poblacion.findAll()
    .then(poblaciones => res.json(poblaciones))
    .catch(err => res.json(err))
})

app.get("/poblaciones/:id", function (req, res) {
    const {id} = req.params;
    Poblacion.findOne({where: {id}})
    .then(poblacion => res.json(poblacion))
    .catch(err => res.json(err))
})
app.listen(3000)