function before(fn) {
    return async function () {
        console.log('-- Calling logger before --')
        console.log('-- function name: ', fn.name)
        console.log('-- arguments: ', arguments)
        return await fn.apply(this, arguments)
    }
}

function after(fn) {
    return async function () {
        var result = await fn.apply(this, arguments)
        console.log('-- Calling logger after --')
        console.log('-- function name: ', fn.name)
        console.log('-- result: ', result)
        return result
    }
}

function around(fn) {
    return async function () {
        console.log('-- Calling logger before --')
        console.log('-- function name: ', fn.name)
        console.log('-- arguments: ', arguments)
        var result = await fn.apply(this, arguments)
        console.log('-- Calling logger after --')
        console.log('-- function name: ', fn.name)
        console.log('-- result: ', result)
        return result
    }
}

function messureTime(fn) {
    return async function () {
        const aftDate = new Date()
        var result = await fn.apply(this, arguments)
        const befDate = new Date()
        const difference = aftDate - befDate
        console.log('-- Calling logger messureTime --')
        console.log('-- function name: ', fn.name)
        console.log('-- Execution time ', (difference/1000) + 's')
    }
}

module.exports = {
    messureTime, before, after, around
}