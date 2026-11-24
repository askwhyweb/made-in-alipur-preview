# Made in Alipur · The Alipur Edit

Preview: https://askwhyweb.github.io/made-in-alipur-preview/new-preview/

The independent homepage concept lives entirely in this folder. The original MVP at the root of the repository is unchanged.

## Homepage navigation campaign slider
The seven image-led slides follow the primary navigation exactly:
1. New Arrivals
2. Our Story
3. Collaborate with Us
4. Berry and Bows (children's line)
5. Meet the Artisans (premium casual, semi-formal and wedding/occasion clothing)
6. Our Collections
7. Journal

Each slide has its own reference photograph, headline, description and CTA to the relevant homepage section. Desktop and mobile both have named controls beneath the carousel, arrow controls, autoplay/pause, and mobile swipe support. The existing seven-card visual navigation remains intact.

## Image reliability
The old Unsplash references were removed. All image elements have a primary reference URL, a secondary image source and a locally committed textile SVG fallback so unavailable third-party images do not leave broken-image icons. Third-party CDN access and live rendering are not guaranteed; replace these URLs with owned photographs hosted in this folder before production. The reference photographs are not actual Made in Alipur merchandise, team members, outlets or artisans.

Reference photography sources used for the concept:
- Khaadi: https://uk.khaadi.com/floral-cambric-kurta/1-26-140-A-A-VG_MULTI.html and https://us.khaadi.com/new-in/ready-to-wear/
- Express Tribune: https://tribune.com.pk/story/2119583/chitrali-woman-made-waves-milan-fashion-week and https://tribune.com.pk/story/649063/a-rainbow-of-colours-at-brands-just-pret-life-style
- Tanya Carlson: https://tanyacarlson.com/blogs/news/the-creative-process-aw22-exclusive-prints-a-collaboration-with-julie-maclean
- Wallonia: https://www.wallonia.be/fr/actualites/les-belges-histoires-valerie-barkowski-une-nomade-intemporelle
- Rangreza: https://rangreza.net/collections/eid-dresses
- Mahezon: https://mahezon.in/products/festive-embroidery-sequence-kid-girl-kurti-palazzo-with-dupatta-suit
- Akbar Aslam: https://www.akbaraslam.com/collections/pakistani-wedding-guest-dresses
- LAAM / Saira Shakira: https://www.laam.com/brands/saira-shakira
- Anayra Amal: https://www.anayraamal.com/new-arrivals
- Pehnava Lawns: https://www.pehnavalawns.com/collections/luxe-ready-to-wear?page=16
- Embroidery detail reference: https://www.pinterest.com/pin/302585668706230439/

## Implementation
- index.html
- assets/styles.css
- assets/app.js
- assets/textile-fallback.svg

This is a static visual preview, not a live shop. Product names and merchandise are illustrative; checkout, inventory, collaboration enquiries and newsletter subscriptions are not connected. Use the existing GitHub Pages deployment workflow.