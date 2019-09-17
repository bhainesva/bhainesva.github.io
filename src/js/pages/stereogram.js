import '../../stereogram.html';

import { onReady } from '../util';
import { DrawAutoStereogram } from '../autostereogram';

const randomRGB = () => Math.floor(Math.random() * 256);

const chunkArray = (arr, size) => {
  const results = [];
  let start = 0;

  while (start < arr.length) {
      results.push(arr.slice(start, start+size));
      start += size;
  }

  return results;
}

onReady(() => {
  const canvas = document.querySelector('canvas.in');
  const outCanvas = document.querySelector('canvas.out');
  const rect = canvas.getBoundingClientRect();
  const ctx = canvas.getContext('2d');
  const ctxOut = outCanvas.getContext('2d');
  ctx.lineWidth = 30;
  let drawing = false;

  window.ca = canvas;
  window.ct = ctx;

  canvas.addEventListener('mousedown', () => {
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    ctx.moveTo(x, y);
    ctx.beginPath();
    drawing = true;
  });

  canvas.addEventListener('mousemove', () => {
    if (drawing) {
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      ctx.lineTo(x, y);
      ctx.stroke();
    }
  });

  canvas.addEventListener('mouseup', () => {
    ctx.stroke();
    drawing = false;
  });

  const button = document.querySelector('button');
  button.addEventListener('click', async () => {
    const imageData = await ctx.getImageData(0,0,500,500);
    const source = chunkArray(chunkArray(imageData.data, 4).map(pixel => pixel[3]).map(p => p==255 ? 1 : 0), 500);
    const stereo = DrawAutoStereogram(source);
    const s = stereo.flat();
    const two55 = s.map(x => x == 1 ? 255 : 0);
    const pix255 = two55.map(x => [0, 0, 0, x]).flat();
    const d = Uint8ClampedArray.from(pix255);
    ctxOut.putImageData(new ImageData(d, 500, 500), 0, 0);
  });
})
