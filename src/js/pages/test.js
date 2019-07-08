import util from '../util';
const {qs, onReady} = util;
import { defaultCounter, inputCounter } from '../components/Counter';
import TimeTraveller from '../components/TimeTraveller';

onReady(() => {
  const counterEl = qs('.defaultCounter', document)
  defaultCounter.mount(defaultCounter.init(0), counterEl);

  inputCounter.mount(inputCounter.init(0), qs('.inputCounter', document));

  const travellingCounter = TimeTraveller.of(defaultCounter, 0);
  travellingCounter.mount(travellingCounter.init(), qs('.travellingCounter', document))

  const travellingInputCounter = TimeTraveller.of(inputCounter, 0);
  travellingInputCounter.mount(travellingInputCounter.init(), qs('.travellingInputCounter', document))
});

