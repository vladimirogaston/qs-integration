const express = require('express')

class ProductsAPI {

    constructor(service) {
        this.service = service
        this.endPoint = '/fetch-products'
    }

    endPoints() {
        const router = express.Router()
        router.get(this.endPoint, async (req, res) => {
            try {
                let res = await this.service.transport()
                res.status(200).send(res)
            } catch (err) {
                res.status(500).send(err)
            }
        })
        return router
    }
}
module.exports = ProductsAPI