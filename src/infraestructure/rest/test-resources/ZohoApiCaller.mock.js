const searchResponse = require('./search.response.json')
const searchInvalidQueryResponse = require('./search-invalid-query.response.json')
const createValidResponse = require('./create-valid.response.json')
const createInvalidResponse = require('./create-invalid.response.json')
const updateValidResponse = require('./update-valid.response.json')
const updateInvalidResponse = require('./update-invalid.response.json')

class ZohoApiCaller {

    constructor(module) {
        this.module = module
    }

    /**
     * criteria == '(Product_Code:equals:xl23q)'
     * @param {*} criteria 
     * @returns always return something
     */
    search = async (criteria) => {
        let res = undefined
        if (criteria === '(Product_Code:equals:xl234324hq)') {
            return res
        }
        if (criteria == undefined || criteria == '') {
            res = JSON.stringify(searchInvalidQueryResponse)
        } else {
            res = JSON.stringify(searchResponse)
        }
        res = JSON.parse(res)
        return res
    }

    /**
     * 
     * @param {*} records 
     * @returns create-success response
     */
    create = async (records) => {
        let ret = []
        for (let INDEX = 0; INDEX < records.data.length; INDEX++) {
            let res = undefined
            if (!records.data[0].hasOwnProperty('Product_Name')) {
                res = JSON.stringify(createInvalidResponse)
            } else {
                res = JSON.stringify(createValidResponse)
            }
            res = JSON.parse(res)
            ret.push(res.data[0])
        }
        return { data: ret }
    }

    /**
     * 
     * @param {*} records 
     * @returns update-success response
     */
    update = async (records) => {
        let ret = []
        for (let INDEX = 0; INDEX < records.data.length; INDEX++) {
            let res = undefined
            if (!records.data[0].hasOwnProperty('id') || !records.data[0].hasOwnProperty('Product_Name')) {
                res = JSON.stringify(updateInvalidResponse)
            } else {
                res = JSON.stringify(updateValidResponse)
            }
            res = JSON.parse(res)
            ret.push(res.data[0])
        }
        return { data: ret }
    }
}

module.exports = ZohoApiCaller