const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors');
const ProuductsAPI = require('../src/infraestructure/api/ProductsAPI')

const app = express()
app.use(bodyParser.json())
app.use(cors())

app.use('/zoho', ProuductsAPI)

const PORT = process.env.PORT || 4040
app.listen(PORT, () => {
    const date = new Date()
    console.log(`App listening on port ${PORT}, Date: ${date}`)
})
