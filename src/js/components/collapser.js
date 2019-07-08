import * as R from 'ramda';
import raw from './raw';
import util from '../util';
const {h, mounterFor} = util;
const forwardTo = require('flyd-forwardto');
const Type = require('union-type');

const of = (Component, args) => {
  // model
  // {
  //   collapsed: bool
  //   contents: child component model
  // }
  const init = (collapsed=false, contents=Component.init(...args)) => ({
    collapsed,
    contents,
  });

  const Action = Type({
    Toggle: [],
    Modify: [Component.Action],
  });

  const update = Action.caseOn({
    Toggle: (model) => ({...model, collapsed: !model.collapsed}),
    Modify: (componentAction, model) => ({...model, contents: Component.update(componentAction, model.contents)}),
  });

  const view = R.curry((action$, model) =>
    h('div.collapse', [
      h('button', {on: {click: [action$, Action.Toggle]}}, 'Collapse Section'),
      h('div', {style: model.collapsed ? {height: '1px', overflow: 'hidden'} : {overflow: 'hidden'}},
        [
          Component.view(forwardTo(action$, Action.Modify), model.contents),
        ]
      ),
    ])
  );

  const mount = mounterFor({view, update});
  return {init, view, update, Action, mount};
}

const defaultCollapser = of(raw);
// export const collapser = {of, ...defaultCollapser}
export default {of, ...defaultCollapser}