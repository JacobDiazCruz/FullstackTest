import express from "express"
import { 
  insertStockController, 
} from "../controllers"
import makeExpressCallback from "../express-callback"
const router = express.Router()

router.post("/insert/stocks", makeExpressCallback(insertStockController))

export { router }