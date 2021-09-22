const LogsDao = require('../infraestructure/data/LogsDao');

class Logger {

    constructor(storage) {
        if(storage == undefined) throw new Error('Storage can not be undefined')
        this.storage = storage
    }

    log = trace => {
        this.storage.save(trace)
    }

    #trace = (text) => {
        var now = new Date();
        now.setTime(now.getTime() - (3 * 3600 * 1000));
        let date = now.getDate() + '/' + (now.getMonth() + 1) + '/' + now.getFullYear();
        date += ' ' + now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds() + ': ';
        return '\n' + date + '\n' + text + '\n'
    }
}

module.exports = Logger