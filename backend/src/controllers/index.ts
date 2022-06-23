import { 
  insertStock, 
  fetchStocksList, 
  createAverageVolumesCsv 
} from "../database"
import invokeInsertStockController from "./insert-stock"
import invokeGetStocksController from "./get-stocks"
import invokeAverageVolumesController from "./average-volumes-csv"

const insertStockController = invokeInsertStockController({ insertStock })
const getStocksController = invokeGetStocksController({ fetchStocksList })
const averageVolumesController = invokeAverageVolumesController({ createAverageVolumesCsv })

const controller = Object.freeze({
  insertStockController,
  getStocksController,
  averageVolumesController
})

export default controller

export {
  insertStockController,
  getStocksController,
  averageVolumesController
}