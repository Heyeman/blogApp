const { model } = require("mongoose");

const getOne = (model) => {
  return async (props) => {
    return await model.findOne(props);
  };
};

const getAll = (model) => async (props) => {
  return await model.find(props).sort({ updatedAt: -1 });
};

const createOne = (model) => async (props) => {
  return await model.create(props);
};

const updateOne = (model) => async (filter, props) => {
  return await model.findOneAndUpdate(filter, {
    $set: props,
  });
};
const deleteOne = (model) => async (filter) => {
  return await model.findAndDelete(filter);
};
const dataAccessLayer = (model) => ({
  getOne: getOne(model),
  getMany: getAll(model),
  createOne: createOne(model),
  updateOne: updateOne(model),
  deleteOne: deleteOne(model),
});

module.exports = dataAccessLayer;
