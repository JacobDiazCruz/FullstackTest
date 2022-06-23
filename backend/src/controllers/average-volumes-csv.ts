import { makeHttpError, makeHttpSuccess } from "../helpers/http-response"

export default function invokeAverageVolumesController({ createAverageVolumesCsv }) {
  return async function averageVolumesController() {
    try {
      await createAverageVolumesCsv()
      return makeHttpSuccess({
        statusCode: 201,
        message: "Created csv file successfully!",
        stocks: {}
      })
    } catch(err) {
      return makeHttpError({
        statusCode: 400,
        message: "Failed creating csv file.",
        stocks: {}
      })
    }
  }
}