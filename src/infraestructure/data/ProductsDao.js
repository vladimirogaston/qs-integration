class ProductsDAO {

    constructor(sqlConnection) {
        this.sqlConnection = sqlConnection
    }

    readFirst = async numberOfRecords => {
        const statement = `SELECT TOP ? * FROM dbo.USR_STINTE P WHERE P.USR_STINTE_ZohoFails <> ?`
        let result = await this.sqlConnection.query(statement, [numberOfRecords, 's'])
        return result
    }

    updateCRMtoTrueByCode = async code => {
        const statement = `UPDATE dbo.USR_STINTE P SET P.USR_VTMCLH_UPDCRM = ? WHERE P.USR_STINTE_ARTCOD = ?`
        let result = await this.sqlConnection.query(statement, ['s', code])
        return result
    }

    updateFailsByCode = async (code, err) => {
        const statement = `UPDATE dbo.USR_STINTE SET P.USR_STINTE_LOGERR = ?, P.USR_STINTE_ZohoFails = ? WHERE P.USR_STINTE_ARTCOD = ?`
        let result = await this.sqlConnection.query(statement, [err, 's', code])
        return result
    }

    deleteByCode = async code => {
        const statement = `DELETE FROM dbo.USR_STINTE P WHERE P.USR_STINTE_ARTCOD = ?`
        let result = await this.sqlConnection.query(statement, [code])
        return result
    }
}

module.exports = ProductsDAO
