const express = require('express')
const router = express.Router()

router.get('/fetch-errors', (req, res)=>{
    console.log('errors by date')
})

module.exports = router