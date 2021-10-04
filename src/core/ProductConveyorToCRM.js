const mapToZohoProduct = require('./bdiToZoho.function')
const delay = require('./delay.function')

const ERROR = 'error'
const SUCCESS = 'success'

class ProductConveyorToCRM {

    constructor(productsPersistence, zohoClient) {
        this.productsPersistence = productsPersistence
        this.caller = zohoClient
        this.DELAY_TIME = 1000 * 15
    }

    transport = async () => {
        let ret = []
        let bdiProducts = await this.readProducts()
        while (bdiProducts.length !== 0) {

            let classification = await this.classify(bdiProducts)
            let upsertResult = await this.upsert(classification)

            let resultCreates = await this.processUpsertResults(upsertResult.creates, classification.creates)
            ret = ret.concat(resultCreates)

            let resultUpdates = await this.processUpsertResults(upsertResult.updates, classification.updates)
            ret = ret.concat(resultUpdates)

            delay(this.DELAY_TIME)
            bdiProducts = await this.readProducts()
        }
        return ret
    }

    readProducts = async () => {
        let ret = (await this.productsPersistence.readFirst(100))
        ret = ret.map(p => mapToZohoProduct(p))
        return ret
    }

    classify = async records => {
        let ret = {
            creates: [],
            updates: []
        }
        for (let INDEX = 0; INDEX < records.length; INDEX++) {
            const CRITERIA = '(Product_Code:equals:' + records[INDEX].Product_Code + ')'
            let searchResponse = await this.caller.search(CRITERIA)
            if (searchResponse == undefined) {
                ret.creates.push(records[INDEX])
            } else {
                records[INDEX].id = searchResponse.data[0].id
                ret.updates.push(records[INDEX])
            }
        }
        return ret
    }

    upsert = async (classification) => {
        return {
            creates: (await this.doAction(classification.creates, await this.caller.create)),
            updates: (await this.doAction(classification.updates, await this.caller.update))
        }
    }

    doAction = async (records, callabck) => {
        let ret = []
        if (records.length != 0) {
            ret = (await callabck(records)).data
        }
        return ret
    }

    processUpsertResults = async (apiResponses, products) => {
        let ret = []
        for (let INDEX = 0; INDEX < apiResponses.length; INDEX++) {
            const RESPONSE = apiResponses[INDEX]
            const PRODUCT = products[INDEX]
            let aux = undefined
            if (RESPONSE.status === SUCCESS) {
                aux = await this.processSuccessResponse(RESPONSE, PRODUCT)
            } else if (RESPONSE.status === ERROR) {
                aux = await this.processErrorResponse(RESPONSE, PRODUCT)
            }
            ret.push(aux)
        }
        return ret
    }

    processSuccessResponse = async (apiResponse, prod) => {
        await this.productsPersistence.deleteByCode(prod.Product_Code.toString())
        return {
            Module_Name: this.caller.getModuleName(),
            Created_Time: apiResponse.details.Created_Time,
            id: apiResponse.details.id,
            message: apiResponse.message,
            status: apiResponse.status,
            Product_Code: prod.Product_Code
        }
    }

    processErrorResponse = async (apiResponse, prod) => {
        apiResponse.Product_Code = prod.Product_Code
        apiResponse.Module_Name = this.module
        apiResponse.date = new Date()
        const errStr = JSON.stringify(apiResponse.details) + ' ' + JSON.stringify(apiResponse.code)
        await this.productsPersistence.updateFailsByCode(prod.Product_Code.toString(), errStr)
        return apiResponse
    }
}

module.exports = ProductConveyorToCRM