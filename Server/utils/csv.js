const { createReadStream } = require("fs");
const csv = require("csv-parser");

const readCSV = async (url) => {
    try {
      const table = [];
      let fd = createReadStream(url).pipe(csv());
      for await (const row of fd) {
        table.push(row);
      }
      return table;
    } catch (error) {
      console.log(`error on reading csv: ${error.message}`);
      return undefined;
    }
  };


  module.exports = {
    readCSV,
  };
  