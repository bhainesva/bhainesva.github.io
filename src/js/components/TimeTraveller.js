import * as R from 'ramda';
import {h, mounterFor} from '../util';
const forwardTo = require('flyd-forwardto');
const Type = require('union-type');

const of = (Component, args) => {
  // Actions
  const Action = Type({
    Jump: [Number],
    Step: [Component.Action],
  })

  // model
  //{
  //  history: [child states]
  //  currentStep: [Number]
  //}
  const init = () => ({
    history: [Component.init(args)],
    currentStep: 0,
  })

  const view = R.curry((action$, state) => h('div.TimeTraveller', [
    h('div.TimeTraveller-wrapper', [
      h('div.TimeTraveller-wormhole', [
        Component.view(forwardTo(action$, Action.Step), state.history[state.currentStep])
      ]),
      h('div.TimeTraveller-timeline',
      [
        h('h5', 'Timeline'),
        ...state.history.map((s, idx) => h('button',
        {on: {click: () => {action$(Action.Jump(idx))}}}
        ,[h('span', {props: {style: idx == state.currentStep ? 'font-weight:bold' : ''}}, `Go to ${idx}`)]))
      ]
      ),
    ])
  ]));


  const update = Action.caseOn({
    Jump: (step, state) => ({...state, currentStep: step}),
    Step: (componentAction, state) => {
      const currentState = state.history[state.currentStep];
      const newState = Component.update(componentAction, currentState);
      return {
        currentStep: state.currentStep + 1,
        history: state.history.slice(0, state.currentStep+1).concat([newState]),
      }
    }
  });

  const mount = mounterFor({view, update, Action, init});
  return {init, view, update, Action, mount}
}

export default { of };