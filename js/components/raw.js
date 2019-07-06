const Type = require('union-type');

const init = (content) => content

const Action = Type({});

const update = (action, model) => model

const view = (action$, model) => model

export default {init, view, update, Action}