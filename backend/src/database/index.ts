import sqlite3 from "sqlite3"
let sql = sqlite3.verbose()
import { stringify } from "csv-stringify"
import fs from "fs"

// connect to DB
const db = new sqlite3.Database("stocks.db", sqlite3.OPEN_READWRITE, (err) => {
  if(err) console.log("ERR DB", err.message)
})

// Create table
// sql = `CREATE TABLE StocksHistory(id INTEGER PRIMARY KEY,date,stock,open,high,low,close,volume)`;
// db.run(sql);

/**
 * @description insert data to Stocks table
 * @status done
 */
async function insertStock(data: any) {
  sql = `INSERT INTO StocksHistory(date,stock,open,high,low,close,volume) VALUES (?,?,?,?,?,?,?)`;
  const queries = [
    data.date,
    data.stock,
    data.open,
    data.high, 
    data.low, 
    data.close,
    data.volume
  ]
  return await new Promise(function(resolve, reject) {
    db.each(sql, queries, (err: any) => {
      if(err) return reject(err.messsage)
      console.log("Done inserting")
    })
  })
}

export default {
  insertStock
}