const ProductConveyorToCRM = require('../core/ProductConveyorToCRM')
const ProductsDAO = require('../infraestructure/data/ProductsDao')
const ZohoApiClient = require('../infraestructure/rest/ZohoApiClient')
const ConsoleLoggerProxy = require('./ConsoleLoggerProxy')
const SqlServerConnection = require('../infraestructure/data/sqlDB')

dotenv.config()
const ENV = process.env.ENVIRONMENT

function makeProdConveyor() {
    let sqlServerConn = new SqlServerConnection()
    let productsDao = new ProductsDAO(sqlServerConn)
    let client = new ZohoApiClient('Products')
    let conveyor = new ProductConveyorToCRM(productsDao, client)

    const logs = new ConsoleLoggerProxy()
    conveyor.processSuccessResponse = logs.after(conveyor.processSuccessResponse)
    conveyor.processErrorResponse = logs.after(conveyor.processErrorResponse)
    conveyor.transport = logs.messureTime(conveyor.transport)
 
    return conveyor
}

module.exports = makeProdConveyor