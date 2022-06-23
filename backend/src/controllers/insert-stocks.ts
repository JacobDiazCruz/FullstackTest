import axios from "axios"
import { makeHttpError } from "../helpers/http-response"

export default function makeInsertStockController ({ insertStock }) {
  return async function stockController() {
    try {
      // Declare static symbols
      const symbols: readonly string[] = [
        "TWTR", "TSLA", "AMZN"
      ]

      // Loop for each symbol
      symbols.forEach(async (symbol: string) => {

        // Api call for each of the symbols
        const res = await axios({
          method: "GET",
          url: `https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY&symbol=${symbol}&apikey=5DUTBJ1PBNXL7NUW`,
          headers: {"User-Agent": "request"}
        })

        // Iterate inside weekly time series object
        let weeklyTimeSeries = res.data["Weekly Time Series"]
        Object.entries(weeklyTimeSeries).map(async ([date, value]) => {
          const newSeries = {
            date,
            stock: symbol
          }
          // Iterate the values for weekly time series and update the object's key to be dynamic
          Object.entries(value).map(([stockKey, stockVal]) => {
            let updatedStockKey = stockKey.replace(/^\d\. /g, "");
            newSeries[updatedStockKey] = stockVal
          })
          // Insert series object to Stocks DB
          await insertStock(newSeries)
        })
      })
    } catch(err) {
      return makeHttpError({
        statusCode: 400,
        message: "Failed inserting stocks",
        stocks: {}
      })
    }
  }
}