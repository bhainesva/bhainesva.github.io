import * as R from 'ramda';
import util from '../util';
const {h, mounterFor} = util;
import raw from './raw';
const forwardTo = require('flyd-forwardto');
const Type = require('union-type');

const of = (Component, args) => {
  // model
  // {
  //   width: Number
  //   contents: child component model
  // }
  const Action = Type({
    SetWidth: [Number],
    Modify: [Component.Action],
  });

  const init = (width, contents=Component.init(...args)) => ({
    width,
    contents,
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

  const targetValue = (ev) => ev.target.value;

  const ifEnter = R.curry(function(fn, val, ev) {
    if (ev.keyCode === 13) return fn(val);
  });

  const inputView = R.curry((action$, model) =>
    h('div', [
      h('input', {on: {keydown: (ev, el) => ifEnter(R.compose(action$, Action.SetWidth, parseInt), targetValue(ev), ev)}}, 'Mobile'),
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
export default {of, ...defaultResizer};