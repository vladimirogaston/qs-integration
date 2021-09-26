const searchResponse = require('../rest/resources/search.response.json')
const createValidResponse = require('../rest/resources/create-valid.response.json')
const createInvalidResponse = require('../rest/resources/create-invalid.response.json')
const updateResponse = require('../rest/resources/update-valid.response.json')
const updateInvalid = require('../rest/resources/update-invalid.response.json')

class ZohoApiClient {

    constructor(module, searchFounds, createFails, updateFails) {
        this.createFails = createFails
        this.updateFails = updateFails
        this.searchFounds = searchFounds
        this.module = module
    }

    search = async criteria => {
        let ret = undefined
        if(this.searchFounds){
            ret = JSON.parse(JSON.stringify(searchResponse))
        }
        return { data: [ret] }
    }

    create = async records => {
        const size = records.length
        let ret = {
            data: undefined
        }
        if(this.createFails) {
            ret.data = this.makeResponse(size, createInvalidResponse)
        } else {
            ret.data = this.makeResponse(size, createValidResponse)
        }
        return ret
    }

    update = async records => {
        const size = records.length
        let ret = {
            data: undefined
        }
        if(this.updateFails) {
            ret.data = this.makeResponse(size, updateInvalid)
        } else {
            ret.data = this.makeResponse(size, updateResponse)
        }
        return ret
    }

    makeResponse = (size, json)=> {
        let ret = []
        for(let index = 0; index < size; index++) {
            ret.push(JSON.parse(JSON.stringify(json)))
        }
        return ret
    }

    getModuleName() {
        return this.module
    }
}

module.exports = ZohoApiClient
