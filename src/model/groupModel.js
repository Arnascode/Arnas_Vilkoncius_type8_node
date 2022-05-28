const mysql = require('mysql2/promise');
const { dbConfig } = require('../config');

async function executeDb(sql, dataToDbArr = []) {
  let conn;
  try {
    conn = await mysql.createConnection(dbConfig);
    const [result] = await conn.execute(sql, dataToDbArr);
    return result;
  } catch (error) {
    console.log('error executeDb', error);
    throw new Error('error executeDb');
  } finally {
    conn?.end();
  }
}

function getGroupsDB() {
  const sql = 'SELECT * FROM groups';
  return executeDb(sql);
}

async function postNewGrp(name) {
  let conn;
  try {
    conn = await mysql.createConnection(dbConfig);
    const sql = 'INSERT INTO groups(name) VALUES (?)';
    const [result] = await conn.execute(sql, [name]);
    return result;
  } catch (error) {
    throw error.message;
  } finally {
    await conn?.end();
  }
}

module.exports = {
  getGroupsDB,
  postNewGrp,
};
