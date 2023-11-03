const express = require('express')
const router = express.Router()

const path = require('path')
const basePath = path.join(__dirname, '../templates')

router.get('/add', (req, res) => {
    res.sendFile(`${basePath}/userform.html`)
})

router.post('/save', (req, res) => {
    const {name, age} = req.body
    console.log(`nome: ${name}, idade: ${age}`)
    res.sendFile(`${basePath}/userform.html`)
})



router.get('/:id', (req, res) => {

    const id = req.params.id

    // leitura da tabela users, e resgatar um usuário do banco

    console.log(`Estamos buscando pelo usuário: ${id}`)

    res.sendFile(`${basePath}/user.html`)
})

module.exports = router