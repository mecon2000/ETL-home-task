const { addPatients } = require("../models/Patients");
const { getDataTransformer } = require("../models/DataTransformers");
const { readCSV } = require("../utils/csv");
const { convert } = require("../utils/convertor");
const { remove65279 } = require("../utils/misc");

const handleNewPatients = async (patientsUrl, hospitalId) => {
  const patients = await readCSV(patientsUrl);
  if (!patients) return false;

  let transformedPatients = await transformPatients(patients, hospitalId);
  if (!transformedPatients) return false;

  const succeeded = await addPatients(transformedPatients);
  return succeeded;
};

const transformPatients = async (patients, hospitalId) => {
  try {
    const transformTable = await getDataTransformer(hospitalId, "Patients");
    const transformedPatients = patients.map((srcPatient) => {
      let dstPatient = {};
      for (const key in srcPatient) {
        const keyWithout65279 = remove65279(key);
        const tranformItem = transformTable.find((x) => x.srcColName == keyWithout65279);
        dstPatient[tranformItem.dstColName] = convert(srcPatient[key], tranformItem.convertMethod);
      }
      return dstPatient;
    });
    return transformedPatients;
  } catch (error) {
    console.log(`failed on transformPatients: ${error.message}`);
  }
};

module.exports = {
  handleNewPatients,
};
