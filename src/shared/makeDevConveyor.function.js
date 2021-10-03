const ProductConveyorToCRM = require('../core/ProductConveyorToCRM')
const ProductsDAO = require('../infraestructure/data/ProductsDao')
const ZohoApiClient = require('../infraestructure/rest/ZohoApiClient.mock')
const ConsoleLoggerProxy = require('./ConsoleLoggerProxy')
const SqlConnection = require('../infraestructure/data/sqlDB.dev')
const dotenv = require('dotenv')

function makeDevConveyor() {
    let sqlConnection = new SqlConnection()
    let productsDao = new ProductsDAO(sqlConnection)
    let client = new ZohoApiClient('Products')
    let conveyor = new ProductConveyorToCRM(productsDao, client)

    const logs = new ConsoleLoggerProxy()
    conveyor.processSuccessResponse = logs.after(conveyor.processSuccessResponse)
    conveyor.processErrorResponse = logs.after(conveyor.processErrorResponse)
    conveyor.transport = logs.messureTime(conveyor.transport)
 
    return conveyor
}

module.exports = makeDevConveyor