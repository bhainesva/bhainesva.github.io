import {h, onReady, noFRPMounterFor} from '../util';
import resizer from '../components/resizer';
import collapser from '../components/collapser';

const resizableCollapser = resizer.of(collapser, [false, h('div', {style: {background: 'lightgreen'}}, 'collapse inside resize')]);
const collapsableResizer = collapser.of(resizer, [1300, h('div', {style: {background: 'lightgreen'}}, 'resize inside collapse')]);

onReady(() => {
  const collapsableResizerEl = document.querySelector('.js-resize-inside-collapse');
  collapsableResizer.mount(collapsableResizer.init(false), collapsableResizerEl);

  const resizableCollapserEl = document.querySelector('.js-collapse-inside-resize');
  resizableCollapser.mount(resizableCollapser.init(1300), resizableCollapserEl);

  const collapseEl = document.querySelector('.js-collapser');
  collapser.mount(collapser.init(false, h('div', {style: {background: 'lightpink'}}, 'Collapse')), collapseEl);

  const resizeEl = document.querySelector('.js-resizer');
  resizer.mount(resizer.init(1300, h('div', {style: {background: 'lightpink'}}, 'Resize')), resizeEl);
});