const mapToZohoProduct = require('./bdiToZoho.function')
const delay = require('./delay.function')

const ERROR = 'error'
const SUCCESS = 'success'

class ProductConveyorToCRM {

    constructor(productsPersistence, zohoClient, errorsPersistence) {
        this.productsPersistence = productsPersistence
        this.caller = zohoClient
        this.DELAY_TIME = 1000 * 30
        this.errorsPersistence = errorsPersistence
    }

    /**
     * 
     * @returns [] api responses for each product upsert
     */
    transport = async () => {
        let ret = []
        let bdiProducts = await this.readProducts()
        while (bdiProducts.length !== 0) {

            let classification = await this.classify(bdiProducts)
            let upsertResult = await this.upsert(classification)

            let result = await this.processUpsertResults(upsertResult.creates, classification.creates)
            result = await this.processUpsertResults(upsertResult.updates, classification.updates)
            ret = ret.concat(result)

            delay(this.DELAY_TIME)
            bdiProducts = await this.readProducts()
        }
        return ret
    }

    /**
    * @returns [] ZohoCRM-Products
    */
    readProducts = async () => {
        let ret = (await this.productsPersistence.readFirst(100))
        ret = ret.map(p => mapToZohoProduct(p))
        return ret
    }

    /**
     * @returns { creates: [products to create], updates: [products to update] }
     */
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

    /**
     * @param {*} classification of type { creates: [ZohoCRM-Products], updates: [ZohoCRM-Products] }
     */
    upsert = async (classification) => {
        return {
            creates: (await this.doAction(classification.creates, await this.caller.create)),
            updates: (await this.doAction(classification.updates, await this.caller.update))
        }
    }

    /**
     * @param {*} records [] ZohoCRM products 
     * @param {*} callabck ZohoApiCaller.{{some method}}
     */
    doAction = async (records, callabck) => {
        let ret = []
        if (records.length != 0) {
            ret = (await callabck(records)).data
        }
        return ret
    }

    /**
     * @param {*} apiResponses [] api response 
     * @param {*} products [] products
     */
    processUpsertResults = async (apiResponses, products) => {
        let ret = []
        for (let INDEX = 0; INDEX < apiResponses.length; INDEX++) {
           const RESPONSE = apiResponses[INDEX]
           const PRODUCT = products[INDEX]
           let aux = undefined 
           if (RESPONSE.status === SUCCESS) {
                aux = await this.processSuccessResponse(RESPONSE, PRODUCT)
            } else if (RESPONSE.status === ERROR) {
                aux = this.processErrorResponse(RESPONSE, PRODUCT)
            }
            ret.push(aux)
        }
        return ret
    }

    /**
     * @param {*} apiResponse one api response { ... }
     * @param {*} prod one ZohoCRM Product
     */
    processSuccessResponse = async (apiResponse, prod) => {
        let ret = undefined
        let resultDeletion = await this.productsPersistence.deleteByCode(prod.Product_Code.toString())
        if (resultDeletion === 1) {
            ret = this.processSuccesDeletionFromBDI(apiResponse, prod)
        } else {
            ret = this.processErrorToDeleteFromBDI(prod)
        }
        return ret
    }

    processSuccesDeletionFromBDI = async (apiResponse, prod) => {
        return {
            Module_Name: this.caller.getModuleName(),
            Created_Time: apiResponse.details.Created_Time,
            id: apiResponse.details.id,
            message: apiResponse.message,
            status: apiResponse.status,
            Product_Code: prod.Product_Code
        }
    }

    processErrorToDeleteFromBDI = async (prod) =>{
        let ret = {
            message: "ERROR TO DELETE FROM BDI",
            Product_Code: prod.Product_Code,
            status: ERROR,
            date: (new Date()).toDateString()
        }
        await this.productsPersistence.updateFailsToTrueByCode(prod.Product_Code.toString())
        await this.productsPersistence.updateCRMtoTrueByCode(prod.Product_Code.toString())
        this.errorsPersistence.save(ret)
        return ret
    }

    /**
     * 
     * @param {*} apiResponse one api response { ... }
     * @param {*} prod one ZohoCRM Product
     * @returns 
     */
    processErrorResponse = (apiResponse, prod) => {
        apiResponse.Product_Code = prod.Product_Code
        apiResponse.Module_Name = this.module

        this.errorsPersistence.save(apiResponse)
        this.productsPersistence.updateFailsToTrueByCode(prod.Product_Code.toString())
        return apiResponse
    }
}

module.exports = ProductConveyorToCRM