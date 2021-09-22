const sqlDb = require('./sqlDB')

class ProductsDao {

    constructor() {
        this.sqlConnection = sqlDb
    }

    /**
     * 
     * @param {} numberOfRecords i.e 39 
     * @returns []
     */
    readFirst = async numberOfRecords => {
        const statement = 'SELECT ALL FROM products LIMIT ' + numberOfRecords
        let result = await this.sqlConnection.query(statement)
        return result
    }

    /**
     * 
     * @param {*} code is an string i.e '123T'
     * @returns 
     */
    deleteByCode = async code => {
        const statement = 'DELETE FROM products p WHERE p.code = ' + code
        let result = await this.sqlConnection.query(statement)
        return result
    }
}

module.exports = ProductsDao
