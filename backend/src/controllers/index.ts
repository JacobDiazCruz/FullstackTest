import { 
  insertStock, 
  fetchStocksList, 
  createAverageVolumesCsv 
} from "../database"
import invokeInsertStockController from "./insert-stocks"

const insertStockController = invokeInsertStockController({ insertStock })

const controller = Object.freeze({
  insertStockController
})

export default controller

export {
  insertStockController
}