const MultiItemConveyor = require('../src/core/MultiItemConveyor')
const ProductsDao = require('../src/infraestructure/data/test-resources/ProductsDao.mock')
const ZohoApiCaller = require('../src/infraestructure/rest/test-resources/ZohoApiCaller.mock')

const PRODUCT_CODE_NOT_IN_CRM = 'xl234324hq'
var dao = undefined
var conveyor = undefined

beforeEach(() => {
    let client = new ZohoApiCaller('Products');
    dao = new ProductsDao(2)
    conveyor = new MultiItemConveyor(dao, client)
})

test('Test classify(products)-> len=2', async()=>{
    let products = await conveyor.readProducts()
    let classify = await conveyor.classify(products)
    let len = classify.updates.length
    expect(len).toBe(2)
})
/*
test('Test classify(products)-> len=1', async()=>{
    let products = await conveyor.readProducts()
    products[0].Product_Code = PRODUCT_CODE_NOT_IN_CRM
    let classify = await conveyor.classify(products)
    let createsLen = classify.creates.length
    let updatesLen = classify.updates.length
    expect(createsLen).toBe(1)
    expect(updatesLen).toBe(1)
})

test('Test classify(products)-> len=1', async()=>{
    let products = await conveyor.readProducts()
    products[0].Product_Code = PRODUCT_CODE_NOT_IN_CRM
    products[1].Product_Code = PRODUCT_CODE_NOT_IN_CRM
    let classify = await conveyor.classify(products)
    let createsLen = classify.creates.length
    expect(createsLen).toBe(2)
})

test('Test upsert(classification) creates->2', async()=>{
    let products = await conveyor.readProducts()
    let classifications = await conveyor.classify(products)
    let upserts = await conveyor.upsert(classifications)
    expect(upserts.creates.length).toBe(0)
    expect(upserts.updates.length).toBe(2)
})

test('Test upsert(classification) creates->1 updates->1', async()=>{
    let products = await conveyor.readProducts()
    products[0].Product_Code = PRODUCT_CODE_NOT_IN_CRM
    let classifications = await conveyor.classify(products)
    let upserts = await conveyor.upsert(classifications)
    expect(upserts.creates.length).toBe(1)
    expect(upserts.updates.length).toBe(1)
})

test('Test transport() -> ', async () => {
    let res = await conveyor.transport()
    expect(res.length).toBe(2)
})*/