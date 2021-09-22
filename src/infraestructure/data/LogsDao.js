const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync.js')

class LogsDao {

    constructor() {
        let adapter = new FileSync("./logsDb.json")
        this.db = low(adapter)
        this.db.defaults({ logs: [] }).write()
        this.module = 'logs'
    }

    save = log => {
        return this.db.get(this.module)
            .push(log)
            .write()
    }

    findByDateAndStatus = (logDate, logStatus) => {
        return this.db.get(this.module)
            .chain()
            .find({ status: logStatus, date: logDate })
            .value()
    }

    clear = () => {
        this.db.get(this.module)
            .remove()
            .write()
    }
}

module.exports = LogsDao