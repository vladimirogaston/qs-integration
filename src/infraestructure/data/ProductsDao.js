const sqlDb = require('./sqlDB')

class ProductsDAO {

    constructor() {
        this.sqlConnection = sqlDb
        this.table = 'dbo.$Sheet1'
    }

    /**
     * 
     * @param {} numberOfRecords i.e 39 
     * @returns []
     */
    readFirst = async numberOfRecords => {
        const statement = `SELECT ALL FROM ${this.table} P WHERE P.USR_VTMCLH_LOGGER IS NULL AND USR_VTMCLH_UPDCRM == FALSE LIMIT ${numberOfRecords}`
        let result = await this.sqlConnection.query(statement)
        return result
    }

    updateFailsToTrueByCode = async (code, err) => {
        const statement = `UPDATE ${this.table} SET USR_VTMCLH_LOGGER = ${err} WHERE USR_STINTE_INDCOD = ${code}`
        let result = await this.sqlConnection.query(statement)
        return result
    }

    /**
     * 
     * @param {*} code is an string i.e '123T'
     * @returns 
     */
    deleteByCode = async code => {
        const statement = `DELETE FROM ${this.table} P WHERE P.USR_STINTE_INDCOD = ${code} AND P.USR_VTMCLH_UPDCRM = TRUE`
        let result = await this.sqlConnection.query(statement)
        return result
    }
}

module.exports = ProductsDAO
