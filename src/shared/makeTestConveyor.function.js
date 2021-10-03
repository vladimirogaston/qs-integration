const ProductConveyorToCRM = require('../core/ProductConveyorToCRM')
const ProductsDAO = require('../infraestructure/data/ProductsDAO.mock')
const ZohoApiClient = require('../infraestructure/rest/ZohoApiClient.mock')
const ConsoleLoggerProxy = require('./ConsoleLoggerProxy')

const SEARCH_FAILS = true
const CREATE_FAILS = false
const UPDATE_FAILS = false
const CANT_PRODS_BDI = 5

function makeTestConveyor() {
    let productsDao = new ProductsDAO(CANT_PRODS_BDI)
    let client = new ZohoApiClient('Products', SEARCH_FAILS, CREATE_FAILS, UPDATE_FAILS)
    let conveyor = new ProductConveyorToCRM(productsDao, client)

    const logs = new ConsoleLoggerProxy()
    conveyor.processSuccessResponse = logs.after(conveyor.processSuccessResponse)
    conveyor.processErrorResponse = logs.after(conveyor.processErrorResponse)
    conveyor.transport = logs.messureTime(conveyor.transport)
    return conveyor
}

module.exports = makeTestConveyor