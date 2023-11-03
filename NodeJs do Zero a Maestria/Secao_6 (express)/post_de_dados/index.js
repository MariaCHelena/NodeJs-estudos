const express = require('express')
const app = express()
const port = 3000

const path = require('path')

app.use(
    express.urlencoded({
        extended: true
    }),
)

app.use(express.json())

const basePath = path.join(__dirname, 'templates')

app.get('/', (req, res) => {
    res.sendFile(`${basePath}/index.html`)
})

app.listen(port, () => {
    console.log('Servidor iniciado!')
})

app.get('/users/add', (req, res) => {
    res.sendFile(`${basePath}/userform.html`)
})

app.post('/users/save', (req, res) => {
    const {name, age} = req.body
    console.log(`nome: ${name}, idade: ${age}`)
    res.sendFile(`${basePath}/userform.html`)
})



app.get('/users/:id', (req, res) => {

    const id = req.params.id

    // leitura da tabela users, e resgatar um usuário do banco

    console.log(`Estamos buscando pelo usuário: ${id}`)

    res.sendFile(`${basePath}/user.html`)
})