
const DPI = 72;
const E = Math.round(2.5 * DPI);
const mu = 1/3;
const separation = (Z) => Math.round(((1-mu*Z)*E)/(2-mu*Z));

const maxX = 500;
const maxY = 500;

const random = () => Math.floor(Math.random() * 2);

const DrawAutoStereogram = (Z) => {
  const output = [...Array(maxY)].map(() => [...Array(maxX)]);
  for (let y=0; y<maxY; y++) {
    let pix = Array(maxX);
    let same = Array(maxX);

    for (let x=0; x<maxX; x++) {
      same[x] = x;
    }

    for (let x=0; x<maxX; x++) {
      const s = separation(Z[y][x]);
      let left = x - Math.floor(s/2);
      let right = left + s;
      if (0 <= left && right < maxX) {
        let visible = null;
        let t = 1;
        let zt = null;

        do {
          zt = Z[y][x] + 2*(2 - mu * Z[y][x]) * t/(mu*E);
          visible = Z[y][x-t] < zt && Z[y][x+t]<zt;
          t++
        }
        while (visible && zt < 1);
        if (visible) {
          let l = same[left];
          while (l != left && l != right) {
            if (l < right) {
              left = l;
              l = same[left];
            } else {
              same[left] = right;
              left = right;
              l = same[left];
              right = l;
            }
          }
          same[left] = right;
        }
      }
      for (let x = maxX-1 ; x >= 0; x--) {
        if (same[x] == x) {
          pix[x] = random();
        } else {
          pix[x] = pix[same[x]];
        }
        output[y][x] = pix[x];
      }
    }
  }

  return output;
}

export { DrawAutoStereogram };