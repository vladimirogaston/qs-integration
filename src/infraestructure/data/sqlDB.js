const db = require('mssql')
const strBuilder = require('sqlstring')
const config = require('./general-config.json').database

class SqlServerConnection {

    constructor() {
    }

    query = async (sqlStatement, values) => {
        let sqlStr = this.#setQuery(sqlStatement, values)
        try {
            await db.connect(config)
            const result = await db.query(sqlStr)
            return result;
        } catch (error) {
            throw new Error("Error in DB connection: " + error.message)
        } finally {
            await db.close()
        }
    }

    #setQuery = (str, data) => {
        return strBuilder.format(str, data)
    }
}

module.exports = SqlServerConnection