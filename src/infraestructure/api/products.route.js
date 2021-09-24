const express = require('express')
const router = express.Router()

// put in a factory method
const MultiItemConveyor = require('../../core/MultiItemConveyor')
const ProductsDao = require('../data/test-resources/ProductsDao.mock')
const ZohoApiCaller = require('../rest/ZohoApiClient')
const ErrorsDao = require('../data/ErrorsDao')
const { after, messureTime } = require('../../core/LogAspect')

router.get('/fetch-products', async (req, res, next) => {
      try {
            let caller = makeConveyor()
            let response = await caller.transport()
            res.status(200).send(response)
      } catch (err) {
            res.status(500).send(err)
      }
      next()
})

const makeConveyor = () => {
      let errorsPersistence = new ErrorsDao()
      let caller = new MultiItemConveyor(new ProductsDao(5), new ZohoApiCaller('Products'), errorsPersistence)
      caller.transport = messureTime(caller.transport)
      caller.processApiResponse = after(caller.processApiResponse)
      return caller
}

module.exports = router
