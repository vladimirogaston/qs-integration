const ProductConveyorToCRM = require('../core/ProductConveyorToCRM')
const ProductsDAO = require('../infraestructure/data/ProductsDao')
const LogsDAO = require('../infraestructure/data/LogsDAO')
const ZohoApiClient = require('../infraestructure/rest/ZohoApiClient')
const FileLoggerProxy = require('./FileLoggerProxy')

const INFO = 'info'
const ERROR = 'error'

function makeProdConveyor() {
    let productsDao = new ProductsDAO()
    let logsDao = new LogsDAO()
    let client = new ZohoApiClient('Products')
    let conveyor = new ProductConveyorToCRM(productsDao, client, logsDao)

    const logs = new FileLoggerProxy()
    conveyor.processSuccesDeletionFromBDI = logs.around(conveyor.processSuccesDeletionFromBDI, INFO)
    conveyor.processErrorToDeleteFromBDI = logs.around(conveyor.processErrorToDeleteFromBDI, ERROR)
    conveyor.processErrorResponse = logs.around(conveyor.processErrorResponse, ERROR)

    return conveyor
}

module.exports = makeProdConveyor