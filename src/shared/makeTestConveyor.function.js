const ProductConveyorToCRM = require('../core/ProductConveyorToCRM')
const ProductsDAO = require('../infraestructure/data/ProductsDAO.mock')
const LogsDAO = require('../infraestructure/data/LogsDAO.mock')
const ZohoApiClient = require('../infraestructure/rest/ZohoApiClient.mock')
//const ZohoApiClient = require('../infraestructure/rest/ZohoApiClient')
const LogsAspect = require('./ConsoleLoggerProxy')

function makeTestConveyor() {
    const cantProd = 5
    let productsDao = new ProductsDAO(cantProd)
    let logsDao = new LogsDAO()
    let client = new ZohoApiClient('Products', false, true, false)
    //let client = new ZohoApiClient('Products')
    let conveyor = new ProductConveyorToCRM(productsDao, client, logsDao)

    const logs = new LogsAspect()
    conveyor.transport = logs.messureTime(conveyor.transport)
    conveyor.processUpsertResults = logs.after(conveyor.processUpsertResults)
    return conveyor
}

module.exports = makeTestConveyor