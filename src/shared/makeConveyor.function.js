const makeTestConveyor = require('./makeTestConveyor.function')
const makeProdConveyor = require('./makeProdConveyor.function')
const dotenv = require('dotenv')

dotenv.config()
const ENV = process.env.ENVIRONMENT

function makeConveyor() {
    let ret = undefined
    if(ENV === "TEST") {
        ret = makeTestConveyor()
    } else if(ENV === "PROD") {
        ret = makeProdConveyor()
    }
    return ret
}

module.exports = makeConveyor