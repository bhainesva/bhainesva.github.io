import { onReady } from '../util';
import '../../encode.html'
import '../../encode.css';

onReady(() => {
  const input = document.querySelector('.js-input');
  const encode = document.querySelector('.js-encode');
  const decode = document.querySelector('.js-decode');
  console.log("woah")

  encode.addEventListener('click', () => {
    input.value = encodeURIComponent(input.value);
  })

  decode.addEventListener('click', () => {
    input.value = decodeURIComponent(input.value);
  })
})