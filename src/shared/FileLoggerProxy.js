const logToFile = require('./logToFile.function')

class FileLoggerProxy {

    around(fn, type) {
        return async function () {
            const fname = fn.name
            const fargs = arguments            
            const beforeTxt = `----- Before:[${fname}] with args:[${fargs}] -----`
            logToFile(type, beforeTxt)
            var result = await fn.apply(this, arguments)
            result = JSON.stringify(result)
            const afterTxt = `----- After:[${fname}] returns:[${result}] -----`
            logToFile(type, afterTxt)
            return result
        }
    }
}

module.exports = FileLoggerProxy