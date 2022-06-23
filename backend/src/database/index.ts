import sqlite3 from "sqlite3"
let sql = sqlite3.verbose()
import { stringify } from "csv-stringify"
import fs from "fs"

// connect to DB
const db = new sqlite3.Database("stocks.db", sqlite3.OPEN_READWRITE, (err) => {
  if(err) console.log("ERR DB", err.message)
})

// Create table
sql = `CREATE TABLE StocksHistory(id INTEGER PRIMARY KEY,date,stock,open,high,low,close,volume)`;
db.run(sql);

/**
 * @description insert data to Stocks table
 * @status done
 */
interface Stock {
  date: string
  stock: string 
  open: string 
  high: string 
  low: string 
  close: string 
  volume: string
}
async function insertStock(data: Stock) {
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
      resolve()
    })
  })
}

/**
 * @description fetch all data from Stocks
 * @status done
 */
async function fetchStocksList() {
  sql = `SELECT * FROM StocksHistory`;
  return await new Promise(function(resolve, reject) {
    db.all(sql, [], (err: any, rows: ArrayBuffer) => {
      if(err) reject(err.message)
      resolve(rows)
    })
  })
}

/**
 * @description create/write average volume csv file
 * @status done
 */
async function createAverageVolumesCsv() {
  sql = `SELECT stock, avg(volume) average_volume_per_year from StocksHistory group by stock`;
  return await new Promise(function(resolve, reject) {
    db.all(sql, [], (err: any, rows: any) => {
      if(err) reject(err.message)

      // Write csv filename
      const filename = "annual_average_volume.csv";
      const writableStream = fs.createWriteStream(filename);
      
      // Declare file columns
      const columns = [
        "stock",
        "average_volume_per_year",
      ];
      
      // Stringify columns
      const stringifier = stringify({ header: true, columns: columns });

      // Perform query to write row
      db.each(sql, (error: any, row: any) => {
        if (error) {
          return error.message
        }
        stringifier.write(row);
      });
      stringifier.pipe(writableStream);
      
      // resolve
      resolve("Success")
    })
  }) 
}

export {
  insertStock,
  fetchStocksList,
  createAverageVolumesCsv
}