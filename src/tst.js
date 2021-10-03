const SqlConnection = require('../src/infraestructure/data/sqlDB.dev')
const ProductsDAO = require('./infraestructure/data/ProductsDao')

const conn = new SqlConnection()
const dao = new ProductsDAO(conn)
dao.readFirst(2).then(rows=>{
    console.log(rows[0])
}).catch(err=>console.log(err))

/*const makeTestConveyor = require('./shared/makeTestConveyor.function')

const service = makeTestConveyor()
service.transport()
    .then(data => { console.log(data) })
    .catch(err => { console.log(err) })*/