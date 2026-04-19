/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export const products = [
  {
    id: '1',
    name: 'Minimalist Chronograph',
    description: 'A precision timepiece featuring a sandblasted steel case and Italian leather strap.',
    price: 450,
    category: 'Watches',
    image: 'https://images.unsplash.com/photo-1508685096489-77a46807f62d?q=80&w=2599&auto=format&fit=crop',
    hoverImage: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?q=80&w=2599&auto=format&fit=crop',
    details: [
      'Swiss movement',
      '40mm stainless steel case',
      'Vegetable-tanned leather',
      '5 ATM water resistance'
    ],
    materials: 'Vegetable-tanned Italian leather, 316L Stainless Steel, Sapphire Crystal.',
    specifications: {
      'Case Diameter': '40mm',
      'Movement': 'Miyota Quartz',
      'Crystal': 'Sapphire',
      'Warranty': '2 Years'
    }
  },
  {
    id: '2',
    name: 'Architectural Ceramic Vase',
    description: 'Hand-thrown matte ceramic vessel with a brutalist-inspired silhouette.',
    price: 185,
    category: 'Home',
    image: 'https://images.unsplash.com/photo-1581783898377-1c85bf937427?q=80&w=2574&auto=format&fit=crop',
    hoverImage: 'https://images.unsplash.com/photo-1612196808214-b9e1d614e380?q=80&w=2574&auto=format&fit=crop',
    details: [
      'Matte charcoal finish',
      'Handmade in Copenhagen',
      'Waterproof interior',
      '12-inch height'
    ],
    materials: 'High-fire stoneware clay with signature mineral-based matte pigment.',
    specifications: {
      'Height': '24cm',
      'Diameter': '12cm',
      'Weight': '1.2kg',
      'Origin': 'Dansk Atelier'
    }
  },
  {
    id: '3',
    name: 'Raw Silk Scarf',
    description: 'Lightweight woven silk in an earthy slate grey tone for the modern pioneer.',
    price: 220,
    category: 'Apparel',
    image: 'https://images.unsplash.com/photo-1601054704854-1a2e79dac4d3?q=80&w=2670&auto=format&fit=crop',
    hoverImage: 'https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?q=80&w=2574&auto=format&fit=crop',
    details: [
      '100% hand-spun silk',
      'Natural vegetable dyes',
      'Fringed edges',
      'Oversized fit'
    ],
    materials: 'Unprocessed mulberry silk fibers dyed with fermented indigo and volcanic minerals.',
    specifications: {
      'Dimensions': '200x70cm',
      'Care': 'Hand wash only',
      'Weave': 'Traditional handloom'
    }
  },
  {
    id: '8',
    name: 'Cashmere Overshirt',
    description: 'A structural layering piece crafted from recycled Mongolian cashmere.',
    price: 680,
    category: 'Apparel',
    image: 'https://images.unsplash.com/photo-1598033129183-a4f500093a08?q=80&w=2574&auto=format&fit=crop',
    hoverImage: 'https://images.unsplash.com/photo-1505022610485-0249ba5b3675?q=80&w=2670&auto=format&fit=crop',
    details: [
      '400gsm cashmere blend',
      'Standard fit',
      'Corozo nut buttons',
      'Hand-finished seams'
    ],
    materials: '70% Recycled Cashmere, 30% Virgin Wool.',
    specifications: {
      'Weight': 'Heavyweight',
      'Fit': 'Oversized',
      'Care': 'Dry Clean Only'
    }
  },
  {
    id: '4',
    name: 'Santal & Cedar Candle',
    description: 'A sophisticated blend of sandalwood, cedarwood, and spicy cardamom.',
    price: 65,
    category: 'Home',
    image: 'https://images.unsplash.com/photo-1603006905521-e5a24ffac81f?q=80&w=2574&auto=format&fit=crop',
    hoverImage: 'https://images.unsplash.com/photo-1596434455580-c08df84f506a?q=80&w=2574&auto=format&fit=crop',
    details: [
      'Natural soy wax blend',
      '60-hour burn time',
      'Hand-poured concrete jar',
      'Lead-free cotton wick'
    ],
    materials: 'Renewable soy wax, phthalate-free fragrance oils, and custom cast architectural concrete.',
    specifications: {
      'Volume': '12oz',
      'Notes': 'Woody, Spicy',
      'Jar': 'Cast Concrete'
    }
  },
  {
    id: '5',
    name: 'Brutalist Card Holder',
    description: 'A structural folding wallet made from a single piece of laser-cut bridle leather.',
    price: 140,
    category: 'Leather',
    image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?q=80&w=2574&auto=format&fit=crop',
    hoverImage: 'https://images.unsplash.com/photo-1559563458-527698bf5295?q=80&w=2670&auto=format&fit=crop',
    details: [
      'Holds up to 10 cards',
      'Stitch-free assembly',
      'Develops unique patina',
      'Origami construction'
    ],
    materials: '3mm thick vegetable-tanned bridle leather with hand-burnished edges.',
    specifications: {
      'Dimensions': '10x7cm',
      'Thickness': '4mm (empty)',
      'Assembly': 'Friction Fold'
    }
  },
  {
    id: '9',
    name: 'Passport Folio',
    description: 'A seamless leather travel case designed for the nomadic essentialist.',
    price: 195,
    category: 'Leather',
    image: 'https://images.unsplash.com/photo-1559563458-527698bf5295?q=80&w=2670&auto=format&fit=crop',
    hoverImage: 'https://images.unsplash.com/photo-1627123424574-724758594e93?q=80&w=2574&auto=format&fit=crop',
    details: [
      'Fits standard passports',
      'SIM card slot',
      'Hidden cash sleeve',
      'RFID blocking lining'
    ],
    materials: 'Full-grain Nappa leather with a silk-touch finish.',
    specifications: {
      'Height': '14cm',
      'Width': '10cm',
      'Finish': 'Matte Black'
    }
  },
  {
    id: '6',
    name: 'Obsidian Desk Lamp',
    description: 'An adjustable task light in powder-coated steel with a solid obsidian base.',
    price: 320,
    category: 'Home',
    image: 'https://images.unsplash.com/photo-1534073828943-f801091bb18c?q=80&w=2574&auto=format&fit=crop',
    hoverImage: 'https://images.unsplash.com/photo-1507473885765-e6ed657f9971?q=80&w=2574&auto=format&fit=crop',
    details: [
      'Warm LED technology',
      'Touch-sensitive dimming',
      'Braided fabric cord',
      'Weighted stone base'
    ],
    materials: 'Anodized aluminum, woven polyester, and genuine volcanic obsidian stone.',
    specifications: {
      'Light Temp': '2700K',
      'Power': '10W LED',
      'Height': '18 inches'
    }
  },
  {
    id: '7',
    name: 'Graphite Writing Set',
    description: 'A precision-balanced lead holder made from aircraft-grade aluminum.',
    price: 95,
    category: 'Lifestyle',
    image: 'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?q=80&w=2574&auto=format&fit=crop',
    hoverImage: 'https://images.unsplash.com/photo-1516962215378-7fa2e137ae93?q=80&w=2574&auto=format&fit=crop',
    details: [
      'Weighted for control',
      '5.6mm graphite lead',
      'Internal sharpener',
      'Matte black finish'
    ],
    materials: 'Anodized 6061-T6 aluminum, high-density graphite.',
    specifications: {
      'Lead Size': '5.6mm',
      'Weight': '42g',
      'Origin': 'Germany'
    }
  }
];
