const express = require("express")
const fs = require("fs")
const app = express()
const PORT = 3000
let datos = JSON.parse(fs.readFileSync("datos.json", "utf-8"))
app.use(express.json())

// Punto 1
app.get("/users/hobby", (req, res) => {
    const { hobby } = req.query
    if (!hobby) {
        return res.status(400).json({ error: "se necesita un hobby" })
    }
    const usuariosfil = datos.filter(user => user.hobbies.includes(hobby))
    if (usuariosfil.length === 0) {
        return res.status(404).json({ message: "no hay usuarios con ese hobby" })
    }
    res.json(usuariosfil)
})

// Punto 2
app.get("/users/exists", (req, res) => {
    const { codigo } = req.query
    if (!codigo) {
        return res.status(400).json({ error: "se necesita un codigo" })
    }
    const usuarioe = datos.some(user => user.codigo === codigo)
    res.json({ exists: usuarioe })
})

// Punto 3
app.get("/users/hobby/count", (req, res) => {
    const { hobby } = req.query
    if (!hobby) {
        return res.status(400).json({ error: "se necesita un hobby" })
    }
    const cant = datos.filter(user => user.hobbies.includes(hobby)).length
    res.json({ hobby, count: cant })
})

// Punto 4
app.get("/users/is-free", (req, res) => {
    const usuario = datos.filter(user => user.hobbies.length < 3)
    res.json(usuario)
})

// Punto 5
app.post("/users/suggest", (req, res) => {
    const { codigo, hobby } = req.body
    if (!codigo || !hobby) {
        return res.status(400).json({ error: "se necesita 'codigo' y 'hobby'" })
    }
    const usuario = datos.find(user => user.codigo === codigo)
    if (!usuario) {
        return res.status(404).json({ error: "no se encontró el usuario" })
    }
    if (usuario.hobbies.length >= 3) {
        return res.status(400).json({ error: "El usuario ya tiene 3 hobbies" })
    }
    usuario.hobbies.push(hobby)
    fs.writeFileSync('./datos.json', JSON.stringify(datos, null, 2))
    res.json({ mensaje: "se agregó hobby", usuario })
})

// Punto 6
app.post("/users", (req, res) => {
    const { codigo, nombre, apellido, hobbies } = req.body
    if (!codigo || !nombre || !apellido || !Array.isArray(hobbies) || hobbies.length < 2) {
        return res.status(400).json({ error: "datos incompletos" })
    }
    const usuarios = datos.find(user => user.codigo === codigo)
    if (usuarios) {
        return res.status(400).json({ error: "usuario existente" })
    }
    const usuarionuev = { codigo, nombre, apellido, hobbies }
    datos.push(usuarionuev)
    fs.writeFileSync('./datos.json', JSON.stringify(datos, null, 2))
    res.status(201).json({ mensaje: "Usuario registrado", usuario: usuarionuev })
})

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`)
})
