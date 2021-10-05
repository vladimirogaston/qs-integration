class ProductsDAO {

    constructor(sqlConnection) {
        this.sqlConnection = sqlConnection
    }

    readFirst = async numberOfRecords => {
        const statement = `SELECT TOP ? USR_STINTE_ARTCOD, USR_STINTE_DESCRP, USR_STINTE_STOCKS, USR_STINTE_ZohoFails, 
        USR_STINTE_UPDCRM FROM dbo.USR_STINTE P WHERE P.USR_STINTE_UPDCRM <> ? 
        AND P.USR_STINTE_ZohoFails IS NULL`
        let result = await this.sqlConnection.query(statement, [numberOfRecords, 's'])
        return result.recordset
    }

    updateCRMtoTrueByCode = async code => {
        const statement = `UPDATE dbo.USR_STINTE SET USR_STINTE_UPDCRM = 's' WHERE USR_STINTE_ARTCOD = ?`
        let result = await this.sqlConnection.query(statement, [code])
        return result.rowsAffected
    }

    updateFailsByCode = async (code, err) => {
        const statement = `UPDATE dbo.USR_STINTE SET USR_STINTE_LOGERR = ?, USR_STINTE_ZohoFails = ? WHERE USR_STINTE_ARTCOD = ?`
        let result = await this.sqlConnection.query(statement, [err, 's', code])
        return result.rowsAffected
    }
}

module.exports = ProductsDAO
