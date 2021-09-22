const express = require('express')
const router = express.Router()
const MultiItemConveyor = require('../../core/MultiItemConveyor')
const ProductsDao = require('../data/test-resources/ProductsDao.mock')
const ZohoApiCaller = require('../rest/ZohoApiCaller')
const Logger = require('../../core/logger')
const LogsDao = require('../data/LogsDao')

router.get('/fetch-products', async (req, res, next) => {
      try {
            let logs = new LogsDao()
            let logger = new Logger(logs)
            let caller = new MultiItemConveyor(new ProductsDao(5), new ZohoApiCaller('Products'), logger)
            let response = await caller.transport()
            res.status(200).send(response)
      } catch (err) {
            res.status(500).send(err)
      }
      next()
})

module.exports = router
