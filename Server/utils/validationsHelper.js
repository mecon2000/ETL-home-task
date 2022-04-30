class ValidationException extends Error {
  constructor(errCode, msgForClient, msgForServer) {
    super(msgForServer);
    this.errCode = errCode;
    this.msgForClient = msgForClient;
    this.msgForServer = msgForServer;
  }
}

const throwIfValidationFailed = (expression, errCode, msgForClient, msgForServer) => {
  if (!expression) {
    throw new ValidationException(errCode, msgForClient, msgForServer);
  }
};

const throwIfMissingParams = (objWithParams) => {
  let missingParams = [];
  for (const param in objWithParams) {
    if (objWithParams[param] === undefined) {
      missingParams.push(param);
    }
  }
  if (missingParams.length > 0)
    throw new ValidationException(400, "missing parameters!", JSON.stringify(missingParams));
};

const logAndSendError = (e, res) => {
  if (e instanceof ValidationException) {
    res.status(e.errCode).send(e.msgForClient);
    console.log(`${e.msgForClient} ${e.msgForServer ?? ""}`);
  } else {
    res.status(500).send("failed for unknown reason");
    console.log(`${e.message}`);
  }
  const codeLineOfError = e?.stack?.split("    at ")[2];
  console.log(codeLineOfError);
};

const isValidUrl = (url) => {
  //TODO make sure url is valid
  return true
}

module.exports = { ValidationException, throwIfValidationFailed, throwIfMissingParams, logAndSendError, isValidUrl };
