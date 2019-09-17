import { onReady } from '../util';
import '../../index.html';
import '../../index.css';

onReady(() => {
  const interstitial = document.querySelector('.js-interstitial');
  interstitial.addEventListener('click', () => {
    interstitial.innerText = 'slick';
    window.setTimeout(() => interstitial.classList.toggle('is-dismissed'), 300);
  });
})
