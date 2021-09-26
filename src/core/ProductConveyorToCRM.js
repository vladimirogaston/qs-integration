const mapToZohoProduct = require('./bdiToZoho.function')
const delay = require('./delay.function')

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
    * 
    * @returns [] ZohoCRM-Products
    */
    readProducts = async () => {
        let ret = (await this.productsPersistence.readFirst(100))
        ret = ret.map(p => mapToZohoProduct(p))
        return ret
    }

    /**
     * 
     * @TODO contemplar searchResponse => invalid! 
     * @returns { creates: [products to create], updates: [products to update] }
     * 
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
     * 
     * @param {*} classification of type { creates: [ZohoCRM-Products], updates: [ZohoCRM-Products] }
     * @returns 
     */
    upsert = async (classification) => {
        return {
            creates: (await this.doAction(classification.creates, await this.caller.create)),
            updates: (await this.doAction(classification.updates, await this.caller.update))
        }
    }

    /**
     * 
     * @param {*} records [] ZohoCRM products 
     * @param {*} callabck ZohoApiCaller.{{some method}}
     * @returns 
     */
    doAction = async (records, callabck) => {
        let ret = []
        if (records.length != 0) {
            ret = (await callabck(records)).data
        }
        return ret
    }

    /**
     * @Todo TEST THIS!
     * @param {*} apiResponses [] api response 
     * @param {*} products [] products
     * @returns 
     */
    processUpsertResults = async (apiResponses, products) => {
        let ret = []
        for (let INDEX = 0; INDEX < apiResponses.length; INDEX++) {
            let result = await this.processApiResponse(apiResponses[INDEX], products[INDEX])
            if (result.status == 'error') {
                this.errorsPersistence.save(result)
            }
            ret.push(result)
        }
        return ret
    }

    /**
     * 
     * @param {*} apiResponse 
     * @param {*} prod 
     * @returns 
     */
    processApiResponse = async (apiResponse, prod) => {
        let ret = undefined
        if (apiResponse.status === "success") {
            ret = await this.processSuccessResponse(apiResponse, prod)
        } else if (apiResponse.status === "error") {
            ret = this.processErrorResponse(apiResponse, prod)
        }
        return ret;
    }

    /**
     * @todo definir que hacer con los items que fallaron al quitarse de la bdi
     * @param {*} apiResponse one api response { ... }
     * @param {*} prod one ZohoCRM Product
     * @returns 
     */
    processSuccessResponse = async (apiResponse, prod) => {
        let ret = undefined
        let resultDeletion = await this.productsPersistence.deleteByCode(prod.Product_Code.toString())
        if (resultDeletion === 1) {
            ret = {
                Module_Name: this.caller.getModuleName(),
                Created_Time: apiResponse.details.Created_Time,
                id: apiResponse.details.id,
                message: apiResponse.message,
                status: apiResponse.status,
                Product_Code: prod.Product_Code
            }
        } else {
            ret = {
                message: "ERROR TO DELETE FROM BDI",
                Product_Code: prod.Product_Code,
                status: 'error',
                date: (new Date()).toDateString()
            }
        }
        return ret
    }

    /**
     * 
     * @todo definir que hacer con los items que fallaron al upsert
     * @param {*} apiResponse one api response { ... }
     * @param {*} prod one ZohoCRM Product
     * @returns 
     */
    processErrorResponse = (apiResponse, prod) => {
        apiResponse.Product_Code = prod.Product_Code
        apiResponse.Module_Name = this.module
        return apiResponse
    }
}

module.exports = ProductConveyorToCRM