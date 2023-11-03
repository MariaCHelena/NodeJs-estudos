const express = require('express')
const app = express()
const port = 3000

const path = require('path')

const basePath = path.join(__dirname, 'templates')

app.get('/', (req, res) => {
    //res.sendFile(`${basePath}/index.html`)
    res.send('Olá, todo mundo!') // com node index não atualiza automaticamente, precisa encerrar o servidor e iniciar de novo. Com o nodemon ele atualiza sem precisar encerrar o servidor
})

app.listen(port, () => {
    console.log('Servidor iniciado!')
})