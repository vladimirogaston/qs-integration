const express = require('express')
const container = require('../../config/bottle.container')

class ProductsAPI {

    constructor(endPoint) {
        this.service = container.ProductConveyorToCRM
        this.endPoint = endPoint
    }

    endPoints() {
        const router = express.Router()
        router.get(this.endPoint, async (req, res) => {
            try {
                let result = await this.service.transport()
                res.status(200).send(result)
            } catch (err) {
                res.status(500).send(err)
            }
        })
        return router
    }
}

module.exports = ProductsAPI