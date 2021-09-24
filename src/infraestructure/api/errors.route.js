const express = require('express')
const router = express.Router()

const ErrorsDao = require('../data/ErrorsDao')

router.get('/errors', (req, res, next) => {
    let parameters = req.query.date
    let dao = new ErrorsDao()
    let result = dao.findByDate(parameters)
    if(result.length == 0) {
        res.status(200).send('Errors not found on date: ', parameters)
    } else {
        res.status(200).send(result)
    }
    next()
})

module.exports = router