import * as R from 'ramda';
import { onReady, patch } from '../util';
import { Tabber, initTabber, elmTabber } from '../tabber';

const qs = R.invoker(1, 'querySelector');

const main = (initState, element, {view, update}) => {
  const newVnode = view(initState, event => {
    const newState = update(initState, event);
    main(newState, newVnode, {view, update});
  });
  patch(element, newVnode);
}

onReady(() => {
  // Init OOP Tabber
  new Tabber(document.querySelector('.js-oop-tabber'));

  // Init FP Tabber
  initTabber(qs('.js-fp-tabber')(document));

  // Init elm tabber
  const initialState = elmTabber.getStateFromDom(document.querySelector('.js-elm-tabber'))
  main(elmTabber.init(initialState), document.querySelector('.js-elm-tabber'), elmTabber)
});