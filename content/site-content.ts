export type Locale = "sk" | "en";

export type Project = {
  category: string;
  title: string;
  description: string;
  detail: string;
  link?: string;
  linkLabel?: string;
  motif: "liva" | "shipendo" | "dito" | "experiments";
};

export type SiteContent = {
  navigation: {
    work: string;
    approach: string;
    about: string;
    contact: string;
    menu: string;
    close: string;
  };
  language: {
    label: string;
    switchTo: string;
  };
  hero: {
    eyebrow: string;
    title: string;
    body: string;
    primaryCta: string;
    secondaryCta: string;
    descriptor: string;
    floatingLabels: string[];
  };
  about: {
    number: string;
    label: string;
    paragraphs: string[];
  };
  projects: {
    number: string;
    title: string;
    intro: string;
    items: Project[];
  };
  approach: {
    number: string;
    title: string;
    items: Array<{ title: string; body: string }>;
  };
  currentFocus: {
    number: string;
    label: string;
    title: string;
    items: string[];
  };
  personal: {
    number: string;
    title: string;
    paragraphs: string[];
    interests: string[];
  };
  contact: {
    label: string;
    title: string;
    body: string;
    button: string;
    secondary: string;
  };
  footer: {
    built: string;
    backToTop: string;
  };
  metadata: {
    title: string;
    description: string;
    ogTitle: string;
    ogDescription: string;
  };
};

export const siteContent = {
  en: {
    navigation: {
      work: "Work",
      approach: "Approach",
      about: "About",
      contact: "Contact",
      menu: "Open menu",
      close: "Close menu",
    },
    language: {
      label: "Language",
      switchTo: "Slovak",
    },
    hero: {
      eyebrow: "Tomáš Šimko · founder and operator · Bratislava",
      title: "I build products, systems and the businesses around them.",
      body: "I work across e-commerce, software, manufacturing and logistics. Most of my work sits between a product and the operation that gets it made, sold and delivered.",
      primaryCta: "See what I’m building",
      secondaryCta: "Say hello",
      descriptor: "Founder · Builder · Operator",
      floatingLabels: ["products", "systems", "machines", "growth"],
    },
    about: {
      number: "01",
      label: "About",
      paragraphs: [
        "I’m an entrepreneur from Bratislava. I build consumer brands, software, production operations and the systems that connect them.",
        "I enjoy the part between an idea and a working business: finding the right product, understanding the details, removing unnecessary work and making the whole operation run better.",
      ],
    },
    projects: {
      number: "02",
      title: "What I’m building",
      intro: "A few of the businesses, products and systems that currently get most of my attention.",
      items: [
        {
          category: "Consumer products · Manufacturing",
          title: "LIVA",
          description: "Building a modern hydration and wellness brand — from formulation and sourcing to production, e-commerce and customer experience.",
          detail: "Product development, brand, operations and scale.",
          link: "https://liva.sk",
          linkLabel: "Visit LIVA",
          motif: "liva",
        },
        {
          category: "Software · Logistics",
          title: "Shipendo",
          description: "Building tools and workflows that make e-commerce fulfillment, shipping and order operations easier to manage.",
          detail: "Automation where software meets the warehouse.",
          motif: "shipendo",
        },
        {
          category: "Consulting · Implementation",
          title: "Dito Consulting",
          description: "Practical consulting in e-commerce, automation, AI implementation and food and supplement manufacturing.",
          detail: "From an operational problem to a working solution.",
          link: "https://ditoconsulting.com",
          linkLabel: "Visit Dito Consulting",
          motif: "dito",
        },
        {
          category: "Capital · New ideas",
          title: "Investments & experiments",
          description: "Exploring real estate, private companies, public markets, crypto, niche e-commerce and new product ideas.",
          detail: "Some become businesses. Others become useful lessons.",
          motif: "experiments",
        },
      ],
    },
    approach: {
      number: "03",
      title: "How I work",
      items: [
        { title: "Make it clear.", body: "A process that cannot be explained simply is usually not ready to scale." },
        { title: "Automate the repeatable.", body: "People should spend time on decisions and improvements, not repetitive clicks." },
        { title: "Stay close to the details.", body: "Strategy works better when you understand what actually happens in the software, warehouse and production line." },
        { title: "Build for real use.", body: "The best solution is not the most impressive one. It is the one people can use every day." },
      ],
    },
    currentFocus: {
      number: "04",
      label: "Right now",
      title: "Currently somewhere between a product idea, a production line and an automation script.",
      items: [
        "Scaling LIVA and its production capabilities.",
        "Making e-commerce and fulfillment operations more automatic.",
        "Using AI to remove repetitive work from real businesses.",
        "Evaluating investments, machines and new product ideas.",
      ],
    },
    personal: {
      number: "05",
      title: "Away from the dashboard",
      paragraphs: [
        "I like cars and road trips, discovering new places, technology, machines and thoughtfully designed spaces.",
        "Most of all, I enjoy understanding how things work — and turning a rough idea into something real.",
      ],
      interests: ["Cars", "Road trips", "Travel", "Technology", "Machines", "Good systems"],
    },
    contact: {
      label: "Contact",
      title: "Have an interesting problem?",
      body: "I’m always interested in useful products, ambitious operations and people who enjoy building things properly.",
      button: "Send message",
      secondary: "Based in Bratislava. Working across Europe.",
    },
    footer: {
      built: "Built with curiosity in Bratislava.",
      backToTop: "Back to top",
    },
    metadata: {
      title: "Tomáš Šimko — Products, Systems and Businesses",
      description: "Tomáš Šimko is a Bratislava-based entrepreneur building consumer products, e-commerce systems, software, manufacturing operations and new business ideas.",
      ogTitle: "I build useful businesses.",
      ogDescription: "Products, systems and the operations behind them.",
    },
  },
  sk: {
    navigation: {
      work: "Projekty",
      approach: "Prístup",
      about: "O mne",
      contact: "Kontakt",
      menu: "Otvoriť menu",
      close: "Zavrieť menu",
    },
    language: {
      label: "Jazyk",
      switchTo: "English",
    },
    hero: {
      eyebrow: "Tomáš Šimko · zakladateľ a praktik · Bratislava",
      title: "Budujem produkty, systémy a firmy okolo nich.",
      body: "Prepájam e-commerce, softvér, výrobu a logistiku. Najčastejšie som medzi produktom a prevádzkou, ktorá ho vyrobí, predá a doručí.",
      primaryCta: "Na čom pracujem",
      secondaryCta: "Ozvať sa",
      descriptor: "Zakladateľ · Tvorca · Praktik",
      floatingLabels: ["produkty", "systémy", "stroje", "rast"],
    },
    about: {
      number: "01",
      label: "O mne",
      paragraphs: [
        "Som podnikateľ z Bratislavy. Budujem spotrebiteľské značky, softvér, výrobné prevádzky a systémy, ktoré ich prepájajú.",
        "Najviac ma baví cesta od nápadu k fungujúcej firme: nájsť správny produkt, pochopiť detaily, odstrániť zbytočnú prácu a nastaviť celý proces tak, aby fungoval lepšie.",
      ],
    },
    projects: {
      number: "02",
      title: "Na čom pracujem",
      intro: "Niekoľko firiem, produktov a systémov, ktorým sa momentálne venujem najviac.",
      items: [
        {
          category: "Spotrebiteľské produkty · Výroba",
          title: "LIVA",
          description: "Budovanie modernej značky hydratácie a každodennej starostlivosti o telo — od formulácie a nákupu surovín až po výrobu, e-commerce a zákaznícku skúsenosť.",
          detail: "Vývoj produktov, značka, prevádzka a rast.",
          link: "https://liva.sk",
          linkLabel: "Pozrieť LIVA",
          motif: "liva",
        },
        {
          category: "Softvér · Logistika",
          title: "Shipendo",
          description: "Vývoj nástrojov a procesov, ktoré zjednodušujú fulfillment, dopravu a správu objednávok v e-commerce.",
          detail: "Automatizácia na mieste, kde sa softvér stretáva so skladom.",
          motif: "shipendo",
        },
        {
          category: "Konzultácie · Implementácia",
          title: "Dito Consulting",
          description: "Praktické konzultácie v oblasti e-commerce, automatizácie, zavádzania AI a výroby potravín a výživových doplnkov.",
          detail: "Od prevádzkového problému k fungujúcemu riešeniu.",
          link: "https://ditoconsulting.com",
          linkLabel: "Pozrieť Dito Consulting",
          motif: "dito",
        },
        {
          category: "Kapitál · Nové nápady",
          title: "Investície a experimenty",
          description: "Investície do nehnuteľností, súkromných firiem, verejných trhov a krypta, doplnené o menšie e-commerce projekty a nové produktové nápady.",
          detail: "Z niektorých vzniknú firmy. Z iných užitočné skúsenosti.",
          motif: "experiments",
        },
      ],
    },
    approach: {
      number: "03",
      title: "Ako pracujem",
      items: [
        { title: "Najprv jasno.", body: "Proces, ktorý sa nedá jednoducho vysvetliť, zvyčajne ešte nie je pripravený na rast." },
        { title: "Opakovateľné automatizovať.", body: "Ľudia by mali venovať čas rozhodnutiam a zlepšeniam, nie opakovanému klikaniu." },
        { title: "Poznať detaily.", body: "Stratégia funguje lepšie, keď rozumiete tomu, čo sa skutočne deje v softvéri, sklade aj na výrobnej linke." },
        { title: "Tvoriť pre reálne použitie.", body: "Najlepšie riešenie nie je to najpôsobivejšie. Je to riešenie, ktoré ľudia dokážu používať každý deň." },
      ],
    },
    currentFocus: {
      number: "04",
      label: "Práve teraz",
      title: "Momentálne niekde medzi produktovým nápadom, výrobnou linkou a automatizačným skriptom.",
      items: [
        "Rozširovanie LIVA a jej výrobných možností.",
        "Automatizácia e-commerce a fulfillmentových procesov.",
        "Používanie AI na odstránenie opakovanej práce v reálnych firmách.",
        "Hodnotenie investícií, strojov a nových produktových nápadov.",
      ],
    },
    personal: {
      number: "05",
      title: "Mimo pracovného dashboardu",
      paragraphs: [
        "Mám rád autá a roadtripy, objavovanie nových miest, technológie, stroje a dobre navrhnuté priestory.",
        "Najviac ma baví pochopiť, ako veci fungujú, a premeniť hrubý nápad na niečo skutočné.",
      ],
      interests: ["Autá", "Roadtripy", "Cestovanie", "Technológie", "Stroje", "Dobré systémy"],
    },
    contact: {
      label: "Kontakt",
      title: "Máte zaujímavý problém?",
      body: "Zaujímajú ma užitočné produkty, ambiciózne prevádzky a ľudia, ktorí radi tvoria veci poriadne.",
      button: "Odoslať správu",
      secondary: "Bratislava. Projekty v rámci celej Európy.",
    },
    footer: {
      built: "Vytvorené so zvedavosťou v Bratislave.",
      backToTop: "Späť hore",
    },
    metadata: {
      title: "Tomáš Šimko — Produkty, systémy a firmy",
      description: "Tomáš Šimko je podnikateľ z Bratislavy, ktorý buduje spotrebiteľské produkty, e-commerce systémy, softvér, výrobné prevádzky a nové podnikateľské projekty.",
      ogTitle: "Tvorím užitočné firmy.",
      ogDescription: "Produkty, systémy a prevádzka, ktorá ich drží pohromade.",
    },
  },
} satisfies Record<Locale, SiteContent>;

export function isLocale(value: string): value is Locale {
  return value === "sk" || value === "en";
}
