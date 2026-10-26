# Lynx Movers — mobile-first website (v1)

A lightweight, responsive landing page. Plain HTML, CSS, and JavaScript: no framework, build step, remote scripts, web fonts, or cookie trackers.

## Preview locally
Open `index.html` directly in a browser, or from this folder run:

```sh
python3 -m http.server 8080
```

Then visit http://localhost:8080. The site is also ready to deploy as static files (for example, via Netlify, Cloudflare Pages, or GitHub Pages).

## Edit
- Colors / spacing / breakpoints: `styles.css` (`:root` tokens)
- Business copy, SEO, markup, service areas, review links: `index.html`
- Calculator rates, local truck fee, 3h minimum and expiration: `script.js`
- Brand icon: `assets/favicon.svg` and inline vector in the header / footer

## Calculator
- 2 movers: **$105/hour**
- 3 movers: **$145/hour**
- Minimum 3 hours
- Truck fee: **$85 for moves within Sacramento**
- Moves outside Sacramento: only labor subtotal is shown; truck fee requires a separate quote
- Packing/materials are explicitly NOT included unless quoted separately
- "Text this estimate" opens an SMS draft on supported devices; it does NOT send a message automatically or submit information to a backend.
- 2026 promotional rates auto-hide at midnight Jan 1, 2027 Sacramento time. Afterward, the site prompts customers to call for current pricing instead of showing expired calculator rates.

Examples: 2 movers × 3h + $85 = **$400**; 3 movers × 3h + $85 = **$520**.

## Before launching
1. Replace the labelled photo placeholders with your own compressed WebP/AVIF images. Suggested: team hero portrait, truck, packing photos. Consider `loading="lazy"` for images below the first screen.
2. Confirm exact California moving license identifier and insurance wording; add license number in trust/footer after verification. Not independently verified here.
3. Verify the promotional **3-hour minimum** against older online posts: an older public Nextdoor post advertises a 2-hour minimum, while this site uses the **3-hour minimum supplied for this project**.
4. Confirm whether any non-local move fees, stair charges, material costs, travel time, taxes, or other conditions should be disclosed.
5. Add exact Google Maps business profile / Instagram links when supplied. Existing external review/profile links are to Thumbtack and Nextdoor, which match Lynx Movers in Sacramento.
6. Confirm the 800 J St address is appropriate for public-facing customer visits; the footer labels it only as an address, not a walk-in location.
7. Verify desired title and description and domain before publishing; no canonical URL is set yet.

## Third-party public profiles (verified when built)
- https://www.thumbtack.com/ca/sacramento/moving-companies/lynx-movers/service/570493838828912654
- https://nextdoor.com/pages/lynx-movers/

All other visual elements are original CSS or inline SVG, with no external image dependencies. The demo contains **no invented client testimonials**.
