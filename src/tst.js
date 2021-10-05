const SqlServerConnection = require('../src/infraestructure/data/sqlDB')
const ProductsDao = require('../src/infraestructure/data/ProductsDao')
const ZohoApiClient = require('../src/infraestructure/rest/ZohoApiClient')

//const dao = new ProductsDao(new SqlServerConnection())
//dao.readFirst(2).then(rows => console.log(rows)).catch(err => console.log(err))

const client = new ZohoApiClient('Products')
client.search('(Product_Code:equals:01010005414)')
    .then(data=>console.log(data))
    .catch(err=>console.log(err))