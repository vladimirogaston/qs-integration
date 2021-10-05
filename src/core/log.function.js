function log(type, apiResponse, prod, module) {
    console.log(`===== PROCESS-API-${type}-RESPONSE == ON-MODULE-${module} ===== ` + new Date)
    console.log(`API-${type}-RESPONSE: ` + JSON.stringify(apiResponse))
    console.log('BDI-ITEM : ' + JSON.stringify(prod))
}

module.exports = log