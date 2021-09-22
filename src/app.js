const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors');
const syncProducts = require('./infraestructure/api/products.route')

const app = express()
app.use(bodyParser.json())
app.use(cors())

app.use('/zoho', syncProducts)

const PORT = process.env.PORT || 4040
app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`)
    console.log('Press Ctrl+C to quit.')
})
