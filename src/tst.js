const container = require('./bottle.container')

const persistence = container.ProductsPersistence
persistence.readFirst(5).then(data=>console.log(data)).catch(err=>console.log(err))