const makeTestConveyor = require('../src/config/makeTestConveyor.function')

const service = makeTestConveyor()
service.transport()
    .then(data => { console.log(data) })
    .catch(err => { console.log(err) })