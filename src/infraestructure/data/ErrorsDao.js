const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync.js')

class ErrorsDao {

    constructor() {
        let adapter = new FileSync("./errorsDb.json")
        this.db = low(adapter)
        this.db.defaults({ errors: [] }).write()
        this.module = 'logs'
    }

    save = log => {
        return this.db.get(this.module)
            .push(log)
            .write()
    }

    /**
     * 
     * @param {*} logDate 'Fri Sep 24 2021' 
     * @returns 
     */
    findByDate = (logDate) => {
        return this.db.get(this.module)
            .chain()
            .find({ date: logDate })
            .value()
    }

    clear = () => {
        this.db.get(this.module)
            .remove()
            .write()
    }
}

module.exports = ErrorsDao