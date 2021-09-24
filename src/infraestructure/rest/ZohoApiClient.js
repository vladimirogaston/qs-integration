const fetch = require('node-fetch')

class ZohoApiClient {

  /**
   * 
   * @param {*} module name like Products, Accounts, etc 
   */
  constructor(module) {
    require('dotenv').config()
    this.urlZohoAPI = process.env.urlZohoAPI
    this.token = process.env.token
    this.module = module
  }

  /**
   * 
   * @param {*} id as a string 
   * @returns 
   */
  read = async id => {
    try {
      const url = this.urlZohoAPI + "getRecord?module=" + this.module + "&id=" + id + "&token=" + this.token;
      let response = await fetch(url);
      response = await response.json();
      return response
    } catch (error) {
      console.log('Error to read: ' + error)
    }
  }

  /**
   * @param {*} ie. (Product_Code:equals:123T) 
   */
  search = async criteria => {
    try {
      var url = this.urlZohoAPI + "searchRecords?module=" + this.module
      url += "&criteria=" + criteria + "&token=" + this.token
      let response = await fetch(url);
      response = await response.json();
      if (response.data === 'Sin resultados para el SEARCH') {
        response = undefined
      }
      return response
    } catch (error) {
      console.log('Error to search: ' + error)
    }
  }

  /**
   * 
   * @param {*} itemId as string 
   * @returns 
   */
  delete = async itemId => {
    try {
      const options = this.#makeFetchOptions('DELETE', JSON.stringify({
        token: this.token,
        module: this.module,
        id: itemId
      }))
      let response = await fetch(this.urlZohoAPI + api, options);
      response = await response.json();
      return response
    } catch (error) {
      console.log("Error to delete: ", error)
    }
  }

  /**
   * @param {*} [ {$zoho-record} ]
   */
  create = async records => {
    return await this.#doFetch(records, 'POST', 'createRecord')
  }
  /**
   * @param {*} [ {$zoho-record} ]
   */

  update = async records => {
    return await this.#doFetch(records, 'PUT', 'updateRecords')
  }

  #doFetch = async (records, method, api) => {
    if (records.length > 100) {
      throw new Error('Max 100 records to create/update by fetch')
    }
    try {
      const options = this.#makeFetchOptions(method, JSON.stringify({
        token: this.token,
        module: this.module,
        dataJSON: { "data": records }
      }))
      let response = await fetch(this.urlZohoAPI + api, options);
      response = await response.json();
      return response
    } catch (error) {
      console.log("Error to fetch: ", error)
    }
  }

  /**
   * 
   * @param {*} method PUT POST DELETE GET 
   * @param {*} bodyOpt Json object
   * @returns 
   */
  #makeFetchOptions = (method, bodyOpt) => {
    return {
      method: method,
      muteHttpExceptions: true,
      headers: { 'Content-Type': 'application/json' },
      body: bodyOpt
    }
  }

  getModuleName() {
    return this.module
  }
}

module.exports = ZohoApiClient
