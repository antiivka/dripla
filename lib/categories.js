torbe_rancevi: 'Torbe i rančevi',
          kaisevi: 'Kaisevi',
          novcanci: 'Novčanici',
          satovi: 'Satovi',
          nakit: 'Nakit',
          naocare: 'Naočare',
          rukavice: 'Rukavice',
          kape_sesiri: 'Kape i šeširi',
          salovi_marame: 'Šalovi i marame',
          ostalo: 'Ostalo'
        }
      }
    }
  },
  
  // Men's categories
  muskarci: {
    label: 'Muškarci',
    subcategories: {
      odeca: {
        label: 'Odeća',
        items: {
          majice: 'Majice',
          kosulje: 'Košulje',
          duksevi: 'Duksevi',
          dzemperi: 'Džemperi',
          jakne_prsluci: 'Jakne i prsluci',
          farmerke: 'Farmerke',
          pantalone: 'Pantalone',
          sortsevi_bermude: 'Šortsevi i bermude',
          trenerke: 'Trenerke',
          kombinezoni_setovi: 'Kombinezoni i setovi',
          odela_sakoi: 'Odela i sakoi',
          donji_ves: 'Donji veš',
          pidzame_bademantili: 'Pidžame i bademantili',
          kupaci: 'Kupaći',
          kostimi_uniforme: 'Kostimi i uniforme'
        }
      },
      obuca: {
        label: 'Obuća',
        items: {
          patike: 'Patike',
          cipele: 'Cipele',
          cizme: 'Čizme',
          papuce_japanke: 'Papuče i japanke',
          sandale: 'Sandale'
        }
      },
      aksesoari: {
        label: 'Aksesoari',
        items: {
          torbe_rancevi: 'Torbe i rančevi',
          kaisevi: 'Kaisevi',
          novcanci: 'Novčanici',
          satovi: 'Satovi',
          nakit: 'Nakit',
          naocare: 'Naočare',
          rukavice: 'Rukavice',
          kape_sesiri: 'Kape i šeširi',
          ostalo: 'Ostalo'
        }
      }
    }
  }
};

// Simplified categories for search filters (grouped)
export const searchFilterCategories = {
  zene: [
    { value: 'sve', label: 'Sve kategorije' },
    { value: 'majice', label: 'Majice' },
    { value: 'kosulje', label: 'Košulje' },
    { value: 'duksevi', label: 'Duksevi' },
    { value: 'dzemperi', label: 'Džemperi' },
    { value: 'jakne', label: 'Jakne i prsluci' },
    { value: 'pantalone-farmerke', label: 'Pantalone i farmerke' },
    { value: 'suknje', label: 'Suknje' },
    { value: 'haljine', label: 'Haljine' },
    { value: 'obuca', label: 'Obuća' },
    { value: 'torbe-aksesoari', label: 'Torbe i aksesoari' }
  ],
  muskarci: [
    { value: 'sve', label: 'Sve kategorije' },
    { value: 'majice', label: 'Majice' },
    { value: 'kosulje', label: 'Košulje' },
    { value: 'duksevi', label: 'Duksevi' },
    { value: 'dzemperi', label: 'Džemperi' },
    { value: 'jakne', label: 'Jakne i prsluci' },
    { value: 'pantalone-farmerke', label: 'Pantalone i farmerke' },
    { value: 'odela', label: 'Odela i sakoi' },
    { value: 'obuca', label: 'Obuća' },
    { value: 'aksesoari', label: 'Aksesoari' }
  ]
};

// Size options
export const sizes = {
  clothing: {
    standard: ['XXXS', 'XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'],
    eu: ['32', '34', '36', '38', '40', '42', '44', '46', '48', '50', '52', '54']
  },
  shoes: {
    women: ['35', '35.5', '36', '36.5', '37', '37.5', '38', '38.5', '39', '39.5', '40', '40.5', '41', '41.5', '42'],
    men: ['39', '39.5', '40', '40.5', '41', '41.5', '42', '42.5', '43', '43.5', '44', '44.5', '45', '45.5', '46', '47']
  }
};

// Colors
export const colors = [
  'Crna', 'Bela', 'Siva', 'Smeđa', 'Bež', 
  'Crvena', 'Roza', 'Narandžasta', 'Žuta',
  'Zelena', 'Plava', 'Ljubičasta',
  'Zlatna', 'Srebrna', 'Šarena'
];

// Condition options
export const conditions = [
  'Novo sa etiketom',
  'Novo bez etikete',
  'Kao novo',
  'Odlično',
  'Vrlo dobro',
  'Dobro',
  'Zadovoljavajuće'
];

// Materials
export const materials = {
  clothing: [
    'Pamuk', 'Poliester', 'Viskoza', 'Lan', 'Svila', 'Vuna', 'Kašmir',
    'Akril', 'Najlon', 'Liocel', 'Modal', 'Rayon', 'Spandex/Elastin',
    'Eko koža', 'Koža', 'Krzno', 'Džins', 'Velur', 'Somot', 'Čipka'
  ],
  shoes: [
    'Koža', 'Eko koža', 'Antilop', 'Velur', 'Platno', 'Mreža',
    'Guma', 'Sintetika', 'Nubuk', 'Lakirana koža'
  ]
};

// Price ranges for filters
export const priceRanges = [
  { value: 'sve', label: 'Svi cenovni rangovi' },
  { value: '0-1000', label: 'Do 1.000 RSD' },
  { value: '1000-3000', label: '1.000 - 3.000 RSD' },
  { value: '3000-5000', label: '3.000 - 5.000 RSD' },
  { value: '5000-10000', label: '5.000 - 10.000 RSD' },
  { value: '10000+', label: 'Preko 10.000 RSD' }
];

// Major cities in Serbia (shortened list for UI)
export const cities = [
  'Beograd', 'Novi Sad', 'Niš', 'Kragujevac', 'Subotica',
  'Pančevo', 'Zrenjanin', 'Čačak', 'Novi Pazar', 'Kraljevo',
  'Smederevo', 'Valjevo', 'Kruševac', 'Vranje', 'Šabac',
  'Užice', 'Sombor', 'Požarevac', 'Pirot', 'Kikinda',
  'Sremska Mitrovica', 'Jagodina', 'Zaječar', 'Leskovac',
  'Negotin', 'Loznica', 'Vrnjačka Banja', 'Aleksinac'
];
