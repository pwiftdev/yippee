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
api/fees.js         Vercel function: live charity fee totals read from Solana
vercel.json         serves /public, cache + security headers
```

To change the contract address or links, edit the constants at the top of `public/js/main.js`.

## Live charity meter (`/api/fees`)

pump.fun routes $YIPPEE creator fees: trades -> creator vault -> pump.fun donation account
(`5BnNQt7fhaofQYtrGYpMi1bzZABoz8npwE466Mx6kRAD`) -> 4 charities at 25% each
(Paws 4 Autism, Seeds for Autism, Autism Health Inc, Autism Speaks).

`/api/fees` reads the chain and returns:
- `waitingSol` — fees sitting in the creator vault, not yet claimed by the charities
- `claimedSol` — fees already moved out of the vault to the donation account
- `totalSol` — both together (what the page shows as "total raised")

Add a **`HELIUS_API_KEY`** environment variable in Vercel (Project → Settings → Environment Variables).
Without it the function falls back to the public Solana RPC, which is slow and rate limited.
Responses are cached at the edge for 60 seconds.

## Run locally

```bash
python -m http.server 5173 --directory public
```

## Deploy to Vercel

1. Import this repo at vercel.com/new
2. Framework preset: **Other** (no build command; `vercel.json` sets the output directory to `public`)
3. Deploy

Or with the CLI: `npx vercel --prod`
