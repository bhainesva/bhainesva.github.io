import { onReady } from '../util';

onReady(() => {
  const interstitial = document.querySelector('.js-interstitial');
  interstitial.addEventListener('click', () => {
    interstitial.innerText = 'slick';
    window.setTimeout(() => interstitial.classList.toggle('is-dismissed'), 300);
  });
})
