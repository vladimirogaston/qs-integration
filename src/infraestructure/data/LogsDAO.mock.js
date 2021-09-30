class ErrorsDao {

    constructor() {
    }

    save = log => {
        console.log('ErrorsDaoMOCK ', log)
    }

    /**
     * 
     * @param {*} logDate 'Fri Sep 24 2021' 
     * @returns 
     */
    findByDate = (logDate) => {
    }

    clear = () => {
    }
}

module.exports = ErrorsDao