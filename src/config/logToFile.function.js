const fs = require('fs');

var logger = fs.createWriteStream('../logs/log.txt', {
    flags: 'a'
})

var errors = fs.createWriteStream('../logs/errors.txt', {
    flags: 'a'
})

function logToFile(type, text) {
    try {
        var now = new Date();
        now.setTime(now.getTime() - (3 * 3600 * 1000));
        let date = now.getDate() + '/' + (now.getMonth() + 1) + '/' + now.getFullYear();
        date += ' ' + now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds() + ': ';
        if (type == "info") {
            logger.write('\n' + date + '\n' + text + '\n');
        } else if (type == "error") {
            errors.write('\n' + date + '\n' + text + '\n');
        }
    } catch (e) {
        console.error("ERROR: " + e);
    }
}

module.exports = logToFile