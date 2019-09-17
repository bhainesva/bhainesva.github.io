import * as R from 'ramda';
import {qs, qsAll, onReady} from '../util';
import { defaultCounter, inputCounter, OOPCounter, OOPNormalCounter } from '../components/Counter';
import TimeTraveller from '../components/TimeTraveller';

const qsDoc = R.flip(qs)(document);

onReady(() => {
  const body = qs('body', document);
  const codeBlocks = qsAll('pre,img', document);
  for (const block of codeBlocks) {
    block.addEventListener('click', () => {
      body.classList.toggle('u-hideAll');
      block.classList.toggle('u-visible');
    })
  }

  qsDoc('.js-outline-mode').addEventListener('click', () => {
    body.classList.toggle('u-hideAllButHeaders');
  });

  const isHeading = (el) => el.nodeName.toLowerCase().includes('h');
  const headings = qsAll('h1,h2,h3,h4,h5,h6', document);
  for (const heading of headings) {
    heading.addEventListener('click', () => {
      let sib = heading.nextSibling;
      while (sib != null && !isHeading(sib)) {
        if (sib.classList) {
          sib.classList.toggle('u-show');
        }
        sib = sib.nextSibling;
      }
    });
  }

  const oopCounterEl = qsDoc('.js-counter--oop');
  const oopCounter = new OOPNormalCounter(oopCounterEl);

  const counterEl = qsDoc('.js-counter')
  defaultCounter.mount(defaultCounter.init(0), counterEl);

  inputCounter.mount(inputCounter.init(0), qsDoc('.js-counter--input'));

  const travellingCounter = TimeTraveller.of(defaultCounter, 0);
  travellingCounter.mount(travellingCounter.init(), qsDoc('.js-travellingCounter'))

  const travellingInputCounter = TimeTraveller.of(inputCounter, 0);
  travellingInputCounter.mount(travellingInputCounter.init(), qs('.js-travellingInputCounter', document))
});

