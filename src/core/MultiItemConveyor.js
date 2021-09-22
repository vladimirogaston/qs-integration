const mapToZohoProduct = require('./bdiToZoho.mapper')
const Logger = require('./logger')
const delay = require('./delay')

class MultiItemConveyor {

    constructor(productsDao, zohoClient) {
        this.productsDao = productsDao
        this.caller = zohoClient
        this.DELAY_TIME = 1000 * 30
        this.logger = new Logger()
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
        console.log('RET ', ret)
        return ret
    }

    /**
    * 
    * @returns [] ZohoCRM-Products
    */
    readProducts = async () => {
        let ret = (await this.productsDao.readFirst(100))
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
            ret.push(result)
        }
        return ret
    }

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
        let resultDeletion = await this.productsDao.deleteByCode(prod.Product_Code.toString())
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
                date: new Date()
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

module.exports = MultiItemConveyor