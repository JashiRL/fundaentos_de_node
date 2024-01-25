const express = require('express')
const app = express()
const port = 5001

app.get('/', (req, res) => {
    res.send('Respuesta de la raíz')
})

app.get('/contacto', (req, res) => {
    res.send('Respuesta del puñeton')
})

app.listen(port, () => {
    console.log('listening server: ', port)
    console.log(`listening server: , ${port}`)  //esta forma con template strings te permite mexclar variables 

})