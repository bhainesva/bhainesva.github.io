import R from 'ramda';
const snabbdom = require('snabbdom');
const h = require('snabbdom/h').default;
import { Tabber, initTabber, elmTabber } from '../tabber';

const patch = snabbdom.init([
  require('snabbdom/modules/class').default,          // makes it easy to toggle classes
  require('snabbdom/modules/props').default,          // for setting properties on DOM elements
  require('snabbdom/modules/style').default,          // handles styling on elements with support for animations
  require('snabbdom/modules/eventlisteners').default, // attaches event listeners
]);

const qsAll = R.invoker(1, 'querySelectorAll');
const qs = R.invoker(1, 'querySelector');

const OnReady = (cb) => {
  if (document.readyState === "complete"
       || document.readyState === "loaded"
       || document.readyState === "interactive") {
    cb.bind(this)();
  } else {
    document.addEventListener('DOMContentLoaded', cb.bind(this));
  }
}

const main = (initState, element, {view, update}) => {
  const newVnode = view(initState, event => {
    const newState = update(initState, event);
    main(newState, newVnode, {view, update});
  });
  patch(element, newVnode);
}

OnReady(() => {
  // Init OOP Tabber
  new Tabber(document.querySelector('.js-oop-tabber'));

  // Init FP Tabber
  initTabber(qs('.js-fp-tabber')(document));

  // Init elm tabber
  const initialState = elmTabber.getStateFromDom(document.querySelector('.js-elm-tabber'))
  main(elmTabber.init(initialState), document.querySelector('.js-elm-tabber'), elmTabber)
});