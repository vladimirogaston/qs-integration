const express = require('express')
const makeConveyor = require('../../shared/makeConveyor.function')

const router = express.Router()
router.get('/fetch-products', async (req, res) => {
    try {
        let service = makeConveyor()
        let result = await service.transport()
        res.status(200).send(result)
    } catch (err) {
        res.status(500).send(err)
    }
})

module.exports = router