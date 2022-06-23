import { makeHttpError } from "../helpers/http-response"

export default function makeGetStocksController({ fetchStocksList }) {
  return async function getStocksController() {
    try {
      // Api call for fetching stocks list
      const res = await fetchStocksList()

      // Http response
      return {
        headers: {
        'Content-Type': 'application/json'
        },
        statusCode: 200,
        data: {
          success: true,
          message: "Stocks fetched successfully!",
          stocks: res
        }
      }
    } catch(err) {
      return makeHttpError({
        statusCode: 400,
        message: "Failed fetching stocks",
        stocks: {}
      })
    }
  }
}