const {
  ValidationException,
  throwIfValidationFailed,
  throwIfMissingParams,
  logAndSendError,
  isValidUrl,
} = require("../utils/validationsHelper");
const { handleNewPatients } = require("../services/Patients");
const { handleNewTreatments } = require("../services/Treatments");

const express = require("express");
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();
const router = express.Router();

//   POST /v1/PatientsTreatment
//   body must contain:
//     hospitalId: int
//     patients: {
// 	     url: <of csv file>  //we're expecting millions data points so data cannot be posted directly
//     }
// 	   treatments: {
// 	     url: <of csv file>
//     }
router.post("/v1/PatientsTreatment", jsonParser, async (req, res) => {
  try {
    const hospitalId = req?.body?.hospitalId;
    const patientsUrl = req?.body?.patients?.url;
    const treatmentsUrl = req?.body?.treatments?.url;

    throwIfMissingParams({ hospitalId, patientsUrl, treatmentsUrl });
    throwIfValidationFailed(await isValidUrl(patientsUrl), 401, "patients url is not valid!");
    throwIfValidationFailed(await isValidUrl(treatmentsUrl), 401, "treatments url is not valid!");

    let isOK = await handleNewPatients(patientsUrl, hospitalId);
    throwIfValidationFailed(isOK, 401, "handling patients failed");

    isOK = await handleNewTreatments(treatmentsUrl, hospitalId);
    throwIfValidationFailed(isOK, 401, "handling treatment failed");

    res.sendStatus(200);
  } catch (e) {
    logAndSendError(e, res);
  }
});

module.exports = router;
