import * as R from 'ramda';
import treis from 'treis';
import util from '../util';
const {h, mounterFor} = util;
const Type = require('union-type');

// model
// {
//   count: Number
// }
const Action = Type({
  Increment: [],
  Decrement: [],
  Set: [Number],
});

const init = (count) => ({count});

const update = treis("Counter Update: ", Action.caseOn({
  Increment: (model) => ({count: model.count + 1}),
  Decrement: (model) => ({count: model.count - 1}),
  Set: (value) => ({count: value}),
}));

const view = R.curry((handler, state) => h('div.Counter', [
  h('div.Counter-count', state.count),
  h('div.Counter-buttons', [
    h('button.Counter-button', {on: {click: () => handler(Action.Decrement)}}, '-'),
    h('button.Counter-button', {on: {click: () => handler(Action.Increment)}}, '+'),
    h('button.Counter-button', {on: {click: () => handler(Action.Set(0))}}, 'Reset'),
  ]),
]));

const inputView = R.curry((handler, state) => h('div.Counter', [
  h('div.Counter-count', state.count),
  h('div.Counter-buttons', [
    h('button.Counter-button', {on: {click: () => handler(Action.Decrement)}}, '-'),
    h('button.Counter-button', {on: {click: () => handler(Action.Increment)}}, '+'),
    h('input', {on: {keydown: (ev) => ifEnter(R.compose(handler, Action.Set, parseInt), targetValue(ev), ev)}}),
  ]),
]));

const targetValue = (ev) => ev.target.value;

const ifEnter = R.curry(function(fn, val, ev) {
  if (ev.keyCode === 13) return fn(val);
});

const defaultMounter = mounterFor({view, update, Action, init});
const defaultCounter = {view, update, Action, init, mount: defaultMounter};

const inputCounterMounter = mounterFor({view: inputView, update, Action, init});
const inputCounter = {view: inputView, update, Action, init, mount: inputCounterMounter};

class OOPCounter {
  constructor(el) {
    this.counterEl = el.querySelector('.js-count');
    this.addButton = el.querySelector('.js-add');
    this.subButton = el.querySelector('.js-sub');
    this.resetButton = el.querySelector('.js-reset');

    if (this.addButton) {
      this.addButton.addEventListener('click', () => {
        this.setCount(this.count + 1);
      });
    }

    if (this.subButton) {
      this.subButton.addEventListener('click', () => {
        this.setCount(this.count - 1);
      });
    }

    if (this.resetButton) {
      this.resetButton.addEventListener('click', () => {
        this.setCount(0);
      });
    }

    this.setCount(0);
  }

  setCount(count) {
    this.count = count;
    this.counterEl.innerText = count;
  }
}

class OOPCounterBase {
  constructor() {
    this.count = 0
  }

  increment() {
    this.count += 1;
  }

  decrement() {
    this.count -= 1;
  }

  set(val) {
    this.count = val;
  }

  getCount() {
    return this.count;
  }
}

class OOPNormalCounter {
  constructor(el) {
    this.counter = new OOPCounterBase();
    this.counterEl = el.querySelector('.js-count');
    this.addButton = el.querySelector('.js-add');
    this.subButton = el.querySelector('.js-sub');
    this.resetButton = el.querySelector('.js-reset');

    this.render();

    if (this.addButton) {
      this.addButton.addEventListener('click', () => {
        this.counter.increment();
        this.render();
      });
    }

    if (this.subButton) {
      this.subButton.addEventListener('click', () => {
        this.counter.decrement();
        this.render();
      });
    }

    if (this.resetButton) {
      this.resetButton.addEventListener('click', () => {
        this.counter.set(0);
        this.render();
      });
    }
  }

  render() {
    this.counterEl.innerText = this.counter.getCount();
  }

}

export {
  OOPCounter,
  OOPNormalCounter,
  defaultCounter,
  inputCounter
};