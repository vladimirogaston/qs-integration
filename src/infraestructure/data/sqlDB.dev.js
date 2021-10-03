var mysql = require('mysql2')
const dotenv = require('dotenv')

class MariaDbConnection {
    constructor() {
        dotenv.config()
        this.connection = mysql.createConnection({
            host: process.env.DEV_DB_HOST,
            user: process.env.DEV_DB_USER,
            password: process.env.DEV_DB_PASS,
            database: process.env.DEV_DB_NAME,
            port: process.env.DEV_DB_PORT
        })
    }

    #connect = () => {
        this.connection.connect(err => {
            if (err) {
                console.log(err)
            } else {
                console.log('DB connection stablish')
            }
        })
    }

    query = (sqlStatement, values) => {
        return new Promise((res, rej) => {
            this.#connect()
            this.connection.query(sqlStatement, values, (err, rows) => {
                if (err) {
                    rej(err)
                } else {
                    res(Object.values(JSON.parse(JSON.stringify(rows))))
                }
            })
            this.#close()
        })
    }

    #close = () => {
        this.connection.end((err) => {
            if (err) {
                console.log(err)
            } else {
                console.log('DB connection closed')
            }
        })
    }
}

module.exports = MariaDbConnection