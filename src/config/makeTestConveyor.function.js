const ProductConveyorToCRM = require('../core/ProductConveyorToCRM')
const ProductsDAO = require('../infraestructure/data/ProductsDAO.mock')
const LogsDAO = require('../infraestructure/data/LogsDAO.mock')
const ZohoApiClient = require('../infraestructure/rest/ZohoApiClient.mock')
const LogsAspect = require('./LogsAspect')

function makeTestConveyor() {
    const cantProd = 5
    let productsDao = new ProductsDAO(cantProd)
    let logsDao = new LogsDAO()
    let client = new ZohoApiClient('Products', true, false, false)
    let conveyor = new ProductConveyorToCRM(productsDao, client, logsDao)

    const logs = new LogsAspect()
    conveyor.transport = logs.messureTime(conveyor.transport)
    conveyor.processUpsertResults = logs.after(conveyor.processUpsertResults)

    return conveyor
}

module.exports = makeTestConveyor