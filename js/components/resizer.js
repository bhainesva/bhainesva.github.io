import R from 'ramda';
import raw from './raw';
import {h, mounterFor} from '../util';
const forwardTo = require('flyd-forwardto');
const Type = require('union-type');

const of = (Component, args) => {
  // model
  // {
  //   width: Number
  //   contents: child component model
  // }
  const init = (width, contents=Component.init(...args)) => ({
    width,
    contents,
  });

  const Action = Type({
    SetWidth: [Number],
    Modify: [Component.Action],
  });

  const update = Action.caseOn({
    SetWidth: (width, model) => ({...model, width: width}),
    Modify: (componentAction, model) => ({...model, contents: Component.update(componentAction, model.contents)}),
  });

  const view = R.curry((action$, model) =>
    h('div', [
      h('button', {on: {click: [action$, Action.SetWidth(320)]}}, 'Mobile'),
      h('button', {on: {click: [action$, Action.SetWidth(1300)]}}, 'Desktop'),
      h('div', {style: {width: `${model.width}px`, transition: 'width 0.5s'}},
        [
          Component.view(forwardTo(action$, Action.Modify), model.contents),
        ]
      ),
    ])
  );

  const mount = mounterFor({view, update});
  return {init, view, update, Action, mount};
}

const defaultResizer = of(raw);
export default {of, ...defaultResizer}