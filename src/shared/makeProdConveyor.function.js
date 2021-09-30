const ProductConveyorToCRM = require('../core/ProductConveyorToCRM')
const ProductsDAO = require('../infraestructure/data/ProductsDao')
const LogsDAO = require('../infraestructure/data/LogsDAO')
const ZohoApiClient = require('../infraestructure/rest/ZohoApiClient')
const LogsAspect = require('./LogsAspect')

function makeProdConveyor() {
    let productsDao = new ProductsDAO()
    let logsDao = new LogsDAO()
    let client = new ZohoApiClient('Products')
    let conveyor = new ProductConveyorToCRM(productsDao, client, logsDao)

    const logs = new LogsAspect()
    conveyor.transport = logs.messureTime(conveyor.transport)
    conveyor.processApiResponse = logs.after(conveyor.processApiResponse)

    return conveyor
}

module.exports = makeProdConveyor