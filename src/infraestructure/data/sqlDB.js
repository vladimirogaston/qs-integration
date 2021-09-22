const sql = require('mssql');
const strBuilder = require('sqlstring');
const config = require('./general-config.json').database;

module.exports = {
    query: async function (sqlStr) {
        return await query(sqlStr);
    },
    updateRecords: async function (table, data, condition) {
        return await updateRecords(table, data, condition);
    },
    insertRecords: async function (table, columns, data) {
        return await insertRecords(table, columns, data);
    },
    deleteRecord: async function (table, condition) {
        return await deleteRecord(table, condition);
    }
}

var queryMssqlDb = async function (sqlStr) {
    try {
        await sql.close();
        await sql.connect(config);
        const result = await sql.query(sqlStr);
        sql.close();
        return result;
    }
    catch (error) {
        sql.close();
        throw new Error("Error in DB connection: " + error.message)
    }
}

var query = async function (sqlStr) {
    return await queryMssqlDb(sqlStr);
}

var updateRecords = async function (table, data, condition) {
    let sqlData;
    const str = "UPDATE `" + table + "` SET ? WHERE " + condition + " ?";
    sqlData = setQuery(str, data);
    console.log(sqlData);
    return await queryMssqlDb(sqlData.replace(/`/gi, ''));
}

var insertRecords = async function (table, columns, data) {
    let sqlData;
    const str = 'INSERT INTO ' + table + ' ' + columns + ' VALUES ?';
    sqlData = setQuery(str, data);
    console.log(sqlData);
    return await queryMssqlDb(sqlData);
}

var deleteRecord = async function (table, condition) {
    const str = 'DELETE FROM ' + table + ' WHERE ' + condition;
    console.log(str);
    return await queryMssqlDb(str);
}

var setQuery = function (str, data) {
    return strBuilder.format(str, data);
}
