const ZohoApiCaller = require('../src/infraestructure/rest/test-resources/ZohoApiCaller.mock')

var caller = undefined

beforeEach(() => {
    caller = new ZohoApiCaller('Products');
});

test('Test search(´Product_Code:equals:1233´) -> !undefined api-search-response', async()=>{
    let response = await caller.search('(Product_Code:equals:1233)')    
    expect(response != undefined).toBe(true)
    expect(response.id == "3871582000011303143").toBe(true)    
})

test('Test search(´xl234324hq´) -> !undefined api-search-response', async()=>{
    let response = await caller.search('(Product_Code:equals:xl234324hq)')
    expect(response == undefined).toBe(true)    
})

test('Test search(´´) -> !undefined api-search-response', async()=>{
    let response = await caller.search('')    
    expect(response != undefined).toBe(true)
    expect(response.status == "error").toBe(true)    
})

test('Test create(&prod) -> !undefined api-create-response', async()=>{
    const prod = {
        Product_Code: '123T',
        Product_Name: 'XXX1',
        Product_Description: 'Desc',
        Qty_in_Stock: 23
    }
    let response = await caller.create({data: [prod]})    
    expect(response.data[0].status == "success").toBe(true)
    expect(response.data[0].message == "record added").toBe(true)
})

test('Test create(&prod) -> !undefined api-create-response', async()=>{
    const prod = {
        Product_Code: '123T',
        Product_Description: 'Desc',
        Qty_in_Stock: 23
    }
    let response = await caller.create({data: [prod]})    
    expect(response.data[0].status == "error").toBe(true)
    expect(response.data[0].message == "required field not found").toBe(true)
})

test('Test update(&prod) -> !undefined api-update-response', async()=>{
    const prod = {
        id: '123123',
        Product_Name: 'XXXX',
        Product_Code: '123T',
        Product_Description: 'Desc',
        Qty_in_Stock: 23
    }
    let response = await caller.update({data: [prod]})
    expect(response.data[0].status == "success").toBe(true)
})

test('Test update(&prod) -> !undefined api-update-response', async()=>{
    const prod = {
        Product_Name: 'XXXX',
        Product_Code: '123T',
        Product_Description: 'Desc',
        Qty_in_Stock: 23
    }
    let response = await caller.update({data: [prod]})
    expect(response.data[0].status == "error").toBe(true)
})