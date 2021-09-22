const fs = require('fs')
class Logger {

    constructor() {
        const flag = { flags: 'a' }
        this.logger = fs.createWriteStream('../logs/log.txt', flag)
        this.errors = fs.createWriteStream('../logs/errors.txt', flag)
    }

    error = (text) => {
        try {
            const trace = this.#trace(text)
            this.errors.write(trace);
        } catch (e) {
            console.error("Logger error: " + e)
        }
    }

    info = (text) => {
        try {
            const trace = this.#trace(text)
            this.logger.write(trace)
        } catch (e) {
            console.error("Logger error: " + e)
        }
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