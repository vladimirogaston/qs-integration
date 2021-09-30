const makeTestConveyor = require('./shared/makeTestConveyor.function')

const service = makeTestConveyor()
service.transport()
    .then(data => { console.log(data) })
    .catch(err => { console.log(err) })