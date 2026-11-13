# $YIPPEE — landing page

A comic-style landing page for **$YIPPEE**, the Solana memecoin starring Yippee, the autism mascot.
100% of creator fees go to autism charities.

- CA: `B3yEiHrvXDRtY14cihzncXwqr4WZwPHpwyqhGDdypump`
- X: https://x.com/Yippee_Mascot

## Structure

Plain static site, no build step.

```
public/
  index.html        page markup
  css/style.css     all styles (comic theme, scroll world, responsive)
  js/yippee.js      SVG factory that draws Yippee + all his variations
  js/main.js        CA copy, Yippee-dex, sounds/confetti, horizontal scroll world
  img/              mascot PNG, favicon, OG image, banner
vercel.json         serves /public, cache + security headers
```

To change the contract address or links, edit the constants at the top of `public/js/main.js`.

## Run locally

```bash
python -m http.server 5173 --directory public
```

## Deploy to Vercel

1. Import this repo at vercel.com/new
2. Framework preset: **Other** (no build command; `vercel.json` sets the output directory to `public`)
3. Deploy

Or with the CLI: `npx vercel --prod`
