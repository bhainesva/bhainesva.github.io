import { onReady } from '../util';
import '../../index.html';
import '../../index.css';

function doIfNoCookie(fn) {
  if (!document.cookie.split('; ').find(row => row.startsWith('dragonCookie'))) {
    fn();
    const date = new Date()
    date.setDate(date.getDate() + 1);
    document.cookie = `dragonCookie=true; expires=${date.toUTCString()}`;
  }
}

onReady(() => {
  const interstitial = document.querySelector('.js-interstitial');

  doIfNoCookie(() => interstitial.classList.remove('is-hidden'));

  interstitial.addEventListener('click', () => {
    interstitial.innerText = 'slick';
    window.setTimeout(() => interstitial.classList.toggle('is-dismissed'), 300);
  });
})
