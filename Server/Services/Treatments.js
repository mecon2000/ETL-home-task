const { addTreatments } = require("../models/Treatments");
const { getDataTransformer } = require("../models/DataTransformers");
const { readCSV } = require("../utils/csv");
const { convert } = require("../utils/convertor");
const { remove65279 } = require("../utils/misc");

const handleNewTreatments = async (treatmentsUrl, hospitalId) => {
  const treatments = await readCSV(treatmentsUrl);
  if (!treatments) return false;

  let transformedTreatments = await transformTreatments(treatments, hospitalId);
  if (!transformedTreatments) return false;

  const succeeded = await addTreatments(transformedTreatments);
  return succeeded;
};

const transformTreatments = async (treatments, hospitalId) => {
  try {
    const transformTable = await getDataTransformer(hospitalId, "Treatments"); 
    const transformedTreatments = treatments.map((srcPatient) => {
      let dstPatient = {};
      for (const key in srcPatient) {
        const keyWithout65279 = remove65279(key);
        const tranformItem = transformTable.find((x) => x.srcColName == keyWithout65279);
        dstPatient[tranformItem.dstColName] = convert(srcPatient[key], tranformItem.convertMethod);
      }
      return dstPatient;
    });
    return transformedTreatments;
  } catch (error) {
    console.log(`failed on transformTreatments: ${error.message}`);
  }
};

module.exports = {
  handleNewTreatments,
};
