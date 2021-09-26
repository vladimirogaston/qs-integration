const express = require('express')

class LogsAPI {

    constructor(service) {
        this.service = service
        this.endPoint = '/fetch-logs'
    }

    endPoints() {
        const router = express.Router()
        router.get(this.endPoint, (req, res) => {
            let parameters = req.query.date
            let result = service.findByDate(parameters)
            if (result.length == 0) {
                res.status(200).send('Errors not found on date: ', parameters)
            } else {
                res.status(200).send(result)
            }
        })
        return router
    }
}
module.exports = LogsAPI