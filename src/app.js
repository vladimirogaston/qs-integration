const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors');
const dotenv = require('dotenv')
const ProuductsAPI = require('../src/infraestructure/api/ProductsAPI')

const app = express()
app.use(bodyParser.json())
app.use(cors())

app.use('/zoho', ProuductsAPI)

const PORT = process.env.PORT || 4040
app.listen(PORT, () => {
    dotenv.config()
    const ENV = process.env.ENVIRONMENT
    console.log(`Environment ${ENV}`)
    const date = new Date()
    console.log(`App listening on port ${PORT}, Date: ${date}`)
})
