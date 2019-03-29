require('dotenv').config()
const express = require('express')
const massive = require('massive')
const products_controller = require('./products_controller')
const { SERVER_PORT, CONNECTION_STRING } = process.env

const app = express()

app.use(express.json())

massive(CONNECTION_STRING)
.then((db) => {
    app.set('db', db)
    console.log('DB Set!');
}).catch(err => console.log(err));

app.post('/api/products', products_controller.create)
app.get('/api/products', products_controller.getAll)
app.get('/api/product/:id', products_controller.getOne)
app.put('/api/product/:id', products_controller.update)
app.delete('/api/product/:id', products_controller.delete)




app.listen(SERVER_PORT, () => { 
    console.log(`magic is happening on ${SERVER_PORT}`);
});