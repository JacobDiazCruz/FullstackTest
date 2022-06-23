// imports
import express from "express"
import cors from "cors"
import helmet from "helmet"
import { router } from "./src/routes"
const app = express()

// Security headers
app.use(
  helmet({
    referrerPolicy: { policy: "no-referrer" },
  })
)
app.use(cors({ origin: true, credentials: true }))
app.use(function (req: any, res: any, next: any) {
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next();
});

// middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use("/", router)

// port listener
const port = 4000
app.listen(port, () => {
  console.log(`start at port ${port}`)
})

export default app