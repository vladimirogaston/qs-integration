const container = require('../src/bottle.container')
const mapToZohoProduct = require('../src/core/bdiToZoho.function')

var conveyor = undefined
beforeAll(() => {
    conveyor = container.ProductConveyorToCRM
})

//FAILS -> records[INDEX].id = searchResponse.data[0].id
test('Test classify OK', async () => {
    let dao = container.ProductsPersistence
    let classification = await conveyor.classify(await dao.readFirst(5))
    expect(classification.updates.length === 5).toBe(true)
    expect(classification.creates.length === 0).toBe(true)
})

test('Test upsert OK', async () => {
    let dao = container.ProductsPersistence
    let classification = await conveyor.classify(await dao.readFirst(5))
    let upserts = await conveyor.upsert(classification)
    expect(upserts.updates.length === 5).toBe(true)
    expect(upserts.creates.length === 0).toBe(true)
})

test('Test processUpsertResult OK', async () => {
    let dao = container.ProductsPersistence
    let classification = await conveyor.classify((await dao.readFirst(5)).map(p=>mapToZohoProduct(p)))
    let upserts = await conveyor.upsert(classification)
    let results = await conveyor.processUpsertResults(upserts.updates, classification.updates)
    expect(results[4] !== undefined).toBe(true)
})