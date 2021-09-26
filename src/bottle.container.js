const ProductConveyorToCRM = require('../src/core/ProductConveyorToCRM')
const ProductsDAO = require('../src/infraestructure/data/ProductsDAO.mock')
const LogsDAO = require('../src/infraestructure/data/LogsDAO')
const ZohoApiClient = require('../src/infraestructure/rest/ZohoApiClient.mock')
const LogsAspect = require('../src/LogsAspect')
const Bottle = require('bottlejs')

var bottle = new Bottle()

bottle.factory('ProductsPersistence', () => {
    return new ProductsDAO(5)
})

bottle.factory('LogsPersistence', () => {
    return new LogsDAO()
})

bottle.factory('ZohoClient', () => {
    return new ZohoApiClient('Products', true, false, false)
})

bottle.factory('ProductConveyorToCRM', (container) => {
    let conveyor = new ProductConveyorToCRM(container.ProductsPersistence,
        container.ZohoClient,
        container.LogsPersistence)

    const logs = new LogsAspect()
    conveyor.transport = logs.messureTime(conveyor.transport)
    conveyor.processApiResponse = logs.after(conveyor.processApiResponse)
    return conveyor
})

module.exports = bottle.container