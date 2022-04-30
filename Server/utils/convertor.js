const moment = require('moment')

const convertDate = (data, convertMethod) => {
    try {
        if (!data || data=="NULL") return undefined
        const methodAsObject = JSON.parse(convertMethod);
        const format = methodAsObject?.dateFrom?.format;
        if (!format) throw Error(`can't find correct format in ${format} `);        
        //console.log(` orig: ${data}, format: ${format} formatted: ${moment(data, "M/dd/yyyy").format()}`)  //TODO moment might be an overkill for this
        return data
      } catch (error) {
        console.log(`error converting Enum using ${convertMethod} on data: ${data}. error: ${error}`);
      }
};

const convertEnum = (data, convertMethod) => {
  try {
    const methodAsObject = JSON.parse(convertMethod);
    const from = methodAsObject?.enum?.from;
    const to = methodAsObject?.enum?.to;
    const ind = from.findIndex(d=>d===data);
    if (ind === -1) throw Error(`can't find ${data} in enum "from" [${from}]`);
    return to.at(ind);
  } catch (error) {
    console.log(`error converting Enum using ${convertMethod} on data: ${data}. error: ${error}`);
  }
};

const convert = (data, convertMethod) => {
  if (!convertMethod) return data;
  try {
    if (convertMethod.includes("dateFrom")) return convertDate(data, convertMethod);
    if (convertMethod.includes("enum")) return convertEnum(data, convertMethod);
    return data;
  } catch (error) {
    console.log(`error converting ${data} using ${convertMethod}`);
    return undefined;
  }
};

module.exports = {
  convert,
};
