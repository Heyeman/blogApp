const logger = require("./logger");
const getOne = (model) => {
  return async (props) => {
    const response = await model.findOne(props);
    return response;
  };
};

const getAll = (model) => async (props) => {
  return await model.find(props).sort({ updatedAt: -1 });
};

const createOne = (model) => async (props) => {
  return await model.create(props);
};

const dataAccessLayer = (model) => ({
  getOne: getOne(model),
  getMany: getAll(model),
  createOne: createOne(model),
});

module.exports = dataAccessLayer;
