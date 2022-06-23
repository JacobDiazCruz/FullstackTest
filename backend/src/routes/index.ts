import express from "express"
import { 
  insertStockController, 
  getStocksController,
  averageVolumesController
} from "../controllers"
import makeExpressCallback from "../express-callback"
const router = express.Router()

router.post("/insert/stocks", makeExpressCallback(insertStockController))
router.get("/stocks", makeExpressCallback(getStocksController))
router.post("/write/csv", makeExpressCallback(averageVolumesController))

export { router }