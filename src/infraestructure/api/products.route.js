const express = require('express')
const router = express.Router()
const MultiItemConveyor = require('../../core/MultiItemConveyor')
const ProductsDao = require('../data/test-resources/ProductsDao.mock')
const ZohoApiCaller = require('../rest/ZohoApiCaller')

router.get('/fetch-products', async (req, res, next) => {
      try {
            let caller = new MultiItemConveyor(new ProductsDao(5), new ZohoApiCaller('Products'))
            let response = await caller.transport()
            res.status(200).send(response)
      } catch (err) {
            res.status(500).send(err)
      }
      next()
})

module.exports = router
