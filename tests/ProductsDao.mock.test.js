const ProductsDao = require('../src/infraestructure/data/test-resources/ProductsDao.mock')

test('Test readFirst(3) -> 3', async () => {
    let dao = new ProductsDao(10)
    let len = (await dao.readFirst(3)).length
    expect(len == 3).toBe(true)
})

test('Test readFirst(22) -> 10', async () => {
    let dao = new ProductsDao(10)
    let len = (await dao.readFirst(22)).length
    expect(len == 10).toBe(true)
})

test('Test deleteByCode(3) -> 1', async() => {
    let dao = new ProductsDao(10)
    let res = (await dao.deleteByCode("1"))
    expect(res == 1).toBe(true)
    res = (await dao.deleteByCode("2"))
    expect(res == 1).toBe(true)
    res = (await dao.deleteByCode("3"))
    expect(res == 1).toBe(true)
})

test('Test deleteByCode(123) -> 0', async()=>{
    let dao = new ProductsDao(10)
    let res = (await dao.deleteByCode(123))
    expect(res == 0).toBe(true)
})