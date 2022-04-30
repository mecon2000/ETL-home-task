const { dataTransformerTable } = require("../../MockDB/DataTransformer");

const getDataTransformer = async (hospitalId, tableName) => {
  return dataTransformerTable.filter((d) => d.hospitalId === hospitalId && d.tableName === tableName);
};

module.exports = {
  getDataTransformer,
};
