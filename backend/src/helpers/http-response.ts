interface Request {
  statusCode: number,
  message: string,
  stocks: any
}
  
const makeHttpError = async (request: Request) => {
  return {
    headers: {
      "Content-Type": "application/json",
    },
    statusCode: request.statusCode,
    data: {
      success: false,
      message: request.message,
    },
  }
}

const makeHttpSuccess = (request: Request) => {
  return {
    headers: {
      'Content-Type': 'application/json'
    },
    statusCode: request.statusCode,
    data: {
      success: true,
      message: request.message,
      stocks: request.stocks
    }
  }
}

export {
  makeHttpSuccess,
  makeHttpError
}