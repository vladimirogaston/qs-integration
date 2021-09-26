const container = require('../src/bottle.container')

//FAILS -> records[INDEX].id = searchResponse.data[0].id
test ('Test classify OK', async ()=>{
    let dao = container.ProductsPersistence
    let conveyor = container.ProductConveyorToCRM
    let classification = await conveyor.classify(await dao.readFirst(5))
    console.log(classification)
    expect(classification !== undefined).toBe(true)
})