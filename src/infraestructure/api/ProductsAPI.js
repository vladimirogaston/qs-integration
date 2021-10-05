const express = require('express')
const makeProdConveyor = require('../../shared/makeProdConveyor.function')

const router = express.Router()
router.get('/products', async (req, res) => {
    try {
        let service = makeProdConveyor()
        await service.transport()
        res.status(200).send('success')
    } catch (err) {
        res.status(500).send(err)
    }
})

module.exports = router