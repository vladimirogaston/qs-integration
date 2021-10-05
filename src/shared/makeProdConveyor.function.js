const ProductConveyorToCRM = require('../core/ProductConveyorToCRM')
const ProductsDAO = require('../infraestructure/data/ProductsDao')
const ZohoApiClient = require('../infraestructure/rest/ZohoApiClient')
const SqlServerConnection = require('../infraestructure/data/sqlDB')

function makeProdConveyor() {
    let sqlServerConn = new SqlServerConnection()
    let productsDao = new ProductsDAO(sqlServerConn)
    let client = new ZohoApiClient('Products')
    let conveyor = new ProductConveyorToCRM(productsDao, client)    
    return conveyor
}

module.exports = makeProdConveyor