class ProductsDAO {

    constructor(sqlConnection) {
        this.sqlConnection = sqlConnection
    }

    readFirst = async numberOfRecords => {
        const statement = `SELECT * FROM dbo.sheet1$ P WHERE P.USR_VTMCLH_UPDCRM = 'n' AND P.USR_VTMCLH_LOGERR = '' LIMIT ?`
        let result = await this.sqlConnection.query(statement, [numberOfRecords])
        return result
    }

    updateCRMtoTrueByCode = async code => {
        const statement = `UPDATE dbo.sheet1$ P SET P.USR_VTMCLH_UPDCRM = ? WHERE P.USR_STINTE_INDCOD = ?`
        let result = await this.sqlConnection.query(statement, ['s', code])
        return result
    }

    updateFailsToTrueByCode = async (code, err) => {
        const statement = `UPDATE dbo.sheet1$ SET P.USR_VTMCLH_LOGGER = ? WHERE P.USR_STINTE_INDCOD = ?`
        let result = await this.sqlConnection.query(statement, [err, code])
        return result
    }

    deleteByCode = async code => {
        const statement = `DELETE FROM dbo.sheet1$ P WHERE P.USR_STINTE_INDCOD = ? AND P.USR_VTMCLH_UPDCRM = ?`
        let result = await this.sqlConnection.query(statement, [code, 's'])
        return result
    }
}

module.exports = ProductsDAO
