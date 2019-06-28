////////////////
// Helpers
////////////////
const l = R.curry((tag, x) => {console.log(tag, x); return x});
const qsAll = R.invoker(1, 'querySelectorAll');
const qs = R.invoker(1, 'querySelector');
const arrayFrom = x => Array.from(x);
const addClass = R.curry((cls, el) => {
  el.classList.add(cls);
});
const removeClass = R.curry((cls, el) => {
  el.classList.remove(cls);
});
const OnReady = (cb) => {
  if (document.readyState === "complete"
       || document.readyState === "loaded"
       || document.readyState === "interactive") {
    cb.bind(this)();
  } else {
    document.addEventListener('DOMContentLoaded', cb.bind(this));
  }
}

////////////////
// OOP Version
///////////////
class OOPTabber {
  constructor (el) {
    this.el = el;

    this.buttons = this.el.querySelectorAll('.js-Tabber-button');
    this.contents = this.el.querySelectorAll('.js-Tabber-body');

    this.tabs = [];
    this.currentActiveTab = null;

    for (const button of this.buttons) {
      for (const content of this.contents) {
        if (button.dataset.tabIndex === content.dataset.tabIndex) {
          this.tabs.push({
            'button': button,
            'content': content,
          });
        }
      }
    }

    for (const tab of this.tabs) {
      tab.button.addEventListener('click', () => {
        if (tab !== this.currentActiveTab) {
          this.activateAndUpdateAll(tab);
        }
      });

      if (!tab.button.classList.contains('is-active')) {
        this.deactivateTab(tab);
      } else {
        this.currentActiveTab = tab;
      }
    }
  }

  activateTab(tab) {
    this.currentActiveTab = tab;
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
const [activateEl, deactivateEl] = (R.map(f => f('is-active')))([addClass, removeClass]);
const getTabIndex = R.path(['dataset', 'tabIndex']);
const tabIndexEq = R.curry((idx, el) => getTabIndex(el) === idx);
const activateElsWithTabIndex = R.curry((els, idx) => els.filter(tabIndexEq(idx)).map(activateEl));
const deactivateElsWithoutTabIndex = R.curry((els, idx) => els.filter(R.compose(R.not, tabIndexEq(idx))).map(deactivateEl));

const initTabber = el => {
  const tabEls = [buttons, contents] = R.map(R.compose(Array.from, R.flip(qsAll)(el)))(['.js-Tabber-button', '.js-Tabber-body'])
  const activationFuncs = R.map(activateElsWithTabIndex, tabEls);
  const deactivationFuncs = R.map(deactivateElsWithoutTabIndex, tabEls);
  const handler = R.compose(R.juxt([...activationFuncs, ...deactivationFuncs]), getTabIndex)

  Array.from(buttons).forEach(el => el.addEventListener('click', () => handler(el)));
}


OnReady(() => {
  // Init OOP Tabber
  const oopTabber = new OOPTabber(document.querySelector('.js-oop-tabber'));

  // Init FP Tabber
  initTabber(qs('.js-fp-tabber')(document));
})