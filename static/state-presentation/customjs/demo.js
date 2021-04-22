import * as R from 'ramda';
import {qs, qsAll, onReady} from '../util';
import { defaultCounter, inputCounter, OOPCounter } from '../components/Counter';
import TimeTraveller from '../components/TimeTraveller';

const qsDoc = R.flip(qs)(document);

onReady(() => {
  const oopCounterEl = qsDoc('.js-counter--oop');
  const oopCounter = new OOPCounter(oopCounterEl);
});

