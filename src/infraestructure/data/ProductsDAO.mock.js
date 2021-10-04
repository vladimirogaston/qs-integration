class ProductsDAO {

    constructor(numberOfRecords) {
        this.products = []
        this.numberOfRecords = numberOfRecords
        for (let COUNT = 0; COUNT < this.numberOfRecords; COUNT++) {
            this.products.push({
                USR_STINTE_TIPPRO: `Familia1${COUNT}`,
                USR_STINTE_ARTCOD: `PROD1 ${COUNT}`,
                USR_STINTE_DESCR: 'DESCRIPRCION1',
                USR_STINTE_INDCOD: `${COUNT+2}TS1`,
                USR_STINTE_STOCKS: COUNT+1,
                USR_VTMCLH_LOGGER: undefined,
                USR_VTMCLH_UPDCRM: false
            })
        }
    }

    readFirst = async nmbr => {
        return this.products
            .slice(0, nmbr)
            .filter(prod=> prod.USR_VTMCLH_LOGGER == undefined && prod.USR_VTMCLH_UPDCRM == false)
    }

    updateCRMtoTrueByCode = async code => {
        this.products.forEach(prod=>{
            if(prod.USR_STINTE_INDCOD == code){
                prod.USR_VTMCLH_UPDCRM = true
            }
        })
    }

    updateFailsToTrueByCode = async code => {
        this.products.forEach(prod=>{
            if(prod.USR_STINTE_INDCOD == code){
                prod.USR_VTMCLH_LOGGER = 'error'
            }
        })
    }

    /**
     * 
     * @param {*} code is an string 
     * @returns 
     */
     deleteByCode = async code => {
        const lenAfter = this.products.length
        this.products = this.products.filter(p => p.USR_STINTE_INDCOD !== code)
        return lenAfter - this.products.length
    }
}

module.exports = ProductsDAO
