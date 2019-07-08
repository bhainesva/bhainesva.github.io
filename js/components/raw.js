const Type = require('union-type');

const init = (content) => content

const Action = Type({});

const update = (model, action) => model

const view = (handler, model) => {
  console.log("raw model: ", model);
  return model
}

export default {init, view, update, Action}