import adaptRequest from "../helpers/adapt-request"

export default function makeExpressCallback(controller: any) {
  return async (req: any, res: any) => {
    const httpRequest = adaptRequest(req)
    try {
      const httpResult = await controller(httpRequest)
      res.set(httpResult.headers)
      .status(httpResult.statusCode)
      .send({
        statusCode: httpResult.statusCode,
        data: httpResult.data
      })
    } catch (e) {
      res.status(500).end()
    }
  }
}