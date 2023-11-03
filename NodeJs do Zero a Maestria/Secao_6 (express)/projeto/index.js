const express = require('express')
const app = express()
const port = 5000

const path = require('path')
const basePath = path.join(__dirname, 'templates')

//rotas

const infoRouter = require('./info')
const contactRouter = require('./contact')

app.use(
    express.urlencoded({
        extended: true
    })
)

app.use(express.json())

app.use(express.static('public'))

app.use("/info", infoRouter)
app.use("/contact", contactRouter)

app.get("/", (req, res) => {
    res.sendFile(`${basePath}/index.html`)
})

app.listen(port, () => {
    console.log('Servidor iniciado na porta ' + port)
})

app.use(function(req, res, next){
    res.status(404).sendFile(`${basePath}/404.html`)
})