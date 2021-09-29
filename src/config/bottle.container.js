const makeTestConveyor = require('./makeTestConveyor.function')
const makeProdConveyor = require('./makeProdConveyor.function')
const Bottle = require('bottlejs')
const dotenv = require('dotenv')

const TEST = "TEST"
const PROD = "PROD"

dotenv.config()
const ENV = process.env.ENVIRONMENT

var bottle = new Bottle()

bottle.factory('ProductConveyorToCRM', (container) => {
    let ret = undefined
    if(ENV === TEST) {
        ret = makeTestConveyor()
    } else if(ENV === PROD) {
        ret = makeProdConveyor()
    }
    return ret
})

module.exports = bottle.container