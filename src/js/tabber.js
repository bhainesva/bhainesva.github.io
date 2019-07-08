import * as R from 'ramda';
import Type from 'union-type';
import h from 'snabbdom/h';

////////////////
// Helpers
////////////////
const qsAll = R.invoker(1, 'querySelectorAll');
const addClass = R.curry((cls, el) => {
  el.classList.add(cls);
});
const removeClass = R.curry((cls, el) => {
  el.classList.remove(cls);
});

////////////////
// OOP Version
///////////////
export class Tabber {
  constructor (el) {
    this.el = el;
    this.tabs = [];

    const buttons = this.el.querySelectorAll('.js-Tabber-button');
    const contents = this.el.querySelectorAll('.js-Tabber-body');
    for (const button of buttons) {
      for (const content of contents) {
        if (button.dataset.tabIndex === content.dataset.tabIndex) {
          this.tabs.push({button, content});
        }
      }
    }

    for (const tab of this.tabs) {
      tab.button.addEventListener('click', () => {
        this.activateAndUpdateAll(tab);
      });
    }
  }

  activateTab(tab) {
    tab.button.classList.add('is-active');
    tab.content.classList.add('is-active');
  }

  deactivateTab(tab) {
    tab.button.classList.remove('is-active');
    tab.content.classList.remove('is-active');
  }

  activateAndUpdateAll(tabToActivate) {
    for (const tab of this.tabs) {
      if (tab !== tabToActivate) {
        this.deactivateTab(tab);
      }
    }
    this.activateTab(tabToActivate);
  }
}

//////////////
// FP Version
//////////////
// Pure
const getTabIndex = R.path(['dataset', 'tabIndex']);
const tabIndexEq = R.useWith(R.equals, [R.identity, getTabIndex]);

// Impure
const activateElsWithTabIndex = R.curry((els, idx) => els.filter(tabIndexEq(idx)).map(addClass('is-active')));
const deactivateElsWithoutTabIndex = R.curry((els, idx) => els.filter((el) => !tabIndexEq(idx, el)).map(removeClass('is-active')));

export const initTabber = el => {
  const tabEls = R.map(R.compose(Array.from, R.flip(qsAll)(el)))(['.js-Tabber-button', '.js-Tabber-body']);
  const [buttons, contents] = tabEls;
  const toRun = R.ap([activateElsWithTabIndex, deactivateElsWithoutTabIndex], tabEls);
  const handler = R.compose(R.juxt(toRun), getTabIndex);
  Array.from(buttons).forEach(el => el.addEventListener('click', () => handler(el)));
}


///////////
// Elm architecture
///////////

/*
model : {
  active: Number,
  buttons: [{id: Number, content: String}],
  bodies: [{id: Number, content: String}],jj
}
*/

const getStateFromDom = (el) => {
  return {
    active: Number(el.querySelector('.js-Tabber-button.is-active').dataset.tabIndex),
    buttons: Array.from(el.querySelectorAll('.js-Tabber-button')).map(button => {return {id: Number(button.dataset.tabIndex), content: button.innerHTML}}),
    bodies: Array.from(el.querySelectorAll('.js-Tabber-body')).map(body => {return {id: Number(body.dataset.tabIndex), content: body.innerHTML}}),
  }
}

const Action = Type({
  Update: [Number],
})

const init = (state) => {
  return state || {
    active: 0,
    buttons: [{id: 0, content: 'Tab 1'}],
    bodies: [{id: 0, content: 'Tab Content 1'}],
  }
}

const update = (state, action) => {
  return Action.case({
    Update: (i) => {return {...state, active: i}},
  }, action);
}

const view = (state, handler) => {
  return h('div.Tabs', [
    h('div.Tabs-buttons',
      state.buttons.map(button => {
        return h('button.Tabs-button',
          {
            on: {click: () => handler(Action.Update(button.id))},
            class: {'is-active': button.id == state.active}
          },
          button.content)
      })
    ),
    h('div.Tabs-bodies',
      state.bodies.filter(R.compose(R.equals(state.active), R.prop('id'))).map(body => h('div', {props: {innerHTML: body.content}}))
    )
  ])
}

export const elmTabber = {view, getStateFromDom, init, update, Action};