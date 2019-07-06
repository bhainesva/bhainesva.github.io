import {h, toVNode, onReady} from '../util';
import resizer from '../components/resizer';
import collapser from '../components/collapser';


onReady(() => {
  const collapsableResizerEl = document.querySelector('.js-resize-inside-collapse');
  const collapsableResizer = collapser.of(resizer, [1300, toVNode(collapsableResizerEl.children[0])]);
  collapsableResizer.mount(collapsableResizer.init(false), collapsableResizerEl);

  const resizableCollapserEl = document.querySelector('.js-collapse-inside-resize');
  const resizableCollapser = resizer.of(collapser, [false, toVNode(resizableCollapserEl.children[0])]);
  resizableCollapser.mount(resizableCollapser.init(1300), resizableCollapserEl);

  const collapseEl = document.querySelector('.js-collapser');
  collapser.mount(collapser.init(false, toVNode(collapseEl.children[0])), collapseEl);

  const resizeEl = document.querySelector('.js-resizer');
  resizer.mount(resizer.init(1300, toVNode(resizeEl.children[0])), resizeEl);
});