class ProductsDao {

    constructor(numberOfRecords) {
        this.products = []
        this.numberOfRecords = numberOfRecords
        for (let COUNT = 0; COUNT < this.numberOfRecords; COUNT++) {
            this.products.push({
                code: (COUNT + 1).toString(),
                name: "prod" + COUNT,
                desc: "tst" + COUNT,
                stock: COUNT + 3
            })
        }
    }

    readFirst = async nmbr => {
        return this.products.slice(0, nmbr)
    }

    /**
     * 
     * @param {*} code is an string 
     * @returns 
     */
    deleteByCode = async code => {
        const lenAfter = this.products.length
        this.products = this.products.filter(p => p.code !== code)
        return lenAfter - this.products.length
    }
}

module.exports = ProductsDao
