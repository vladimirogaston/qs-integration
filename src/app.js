const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors');
const container = require('./bottle.container')

const ProuductsAPI = require('../src/infraestructure/api/ProductsAPI')

const app = express()
app.use(bodyParser.json())
app.use(cors())

app.use('/zoho', new ProuductsAPI(container.conveyor).endPoints())

const PORT = process.env.PORT || 4040
app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`)
    console.log('Press Ctrl+C to quit.')
})
