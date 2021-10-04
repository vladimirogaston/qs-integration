const SqlServerConnection = require('../src/infraestructure/data/sqlDB')
const ProductsDao = require('../src/infraestructure/data/ProductsDao')

const dao = new ProductsDao(new SqlServerConnection())
dao.readFirst(2).then(rows => console.log(rows)).catch(err => console.log(err))