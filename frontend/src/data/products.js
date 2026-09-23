import { formatMoney } from "./store.js";
const catalog = [
  {
    id: 1,
    slug: "solstice-gold-hoops",
    name: "Solstice Gold Hoops",
    category: "Earrings",
    price: 85,
    image: "earrings",
    material: "18k gold vermeil",
    tag: "BESTSELLER",
    description:
      "Your everyday golden hour. Sculptural, softly rounded hoops that bring just the right amount of light to every look.",
    sizes: ["One size"],
  },
  {
    id: 2,
    slug: "petal-pendant-necklace",
    name: "Petal Pendant Necklace",
    category: "Necklaces",
    price: 120,
    image: "necklace",
    material: "18k gold vermeil",
    tag: "MOST LOVED",
    description:
      "A little poetry, close to your heart. A delicate pendant on a fine golden chain, made for layering or letting it shine on its own.",
    sizes: ["16 inches", "18 inches", "20 inches"],
  },
  {
    id: 3,
    slug: "eternal-gold-ring",
    name: "Eternal Gold Ring",
    category: "Rings",
    price: 95,
    image: "ring",
    material: "Gold-plated sterling silver",
    tag: "",
    description:
      "Simple lines. Endless possibilities. A beautifully polished ring with a timeless silhouette that feels entirely your own.",
    sizes: ["UK J", "UK L", "UK N", "UK P", "UK R"],
  },
  {
    id: 4,
    slug: "luna-crystal-bracelet",
    name: "Luna Crystal Bracelet",
    category: "Bracelets",
    price: 110,
    image: "bracelet",
    material: "Crystal & gold-plated brass",
    tag: "NEW",
    description:
      "Luminous crystals meet a touch of gold. An effortless companion for slow mornings and special evenings.",
    sizes: ["Small / Medium", "Medium / Large"],
  },
  {
    id: 5,
    slug: "muse-drop-earrings",
    name: "Muse Drop Earrings",
    category: "Earrings",
    price: 105,
    image: "earrings",
    material: "18k gold vermeil",
    tag: "NEW",
    description:
      "A graceful golden detail with a sculptural finish. Lightweight and quietly expressive, from the first coffee to the last dance.",
    sizes: ["One size"],
  },
  {
    id: 6,
    slug: "golden-hour-chain",
    name: "Golden Hour Chain",
    category: "Necklaces",
    price: 135,
    image: "necklace",
    material: "18k gold vermeil",
    tag: "",
    description:
      "Meet the foundation of your necklace collection. Warm gold, an adjustable length, and endless ways to make it yours.",
    sizes: ["16 inches", "18 inches", "20 inches"],
  },
  {
    id: 7,
    slug: "flora-stacking-ring",
    name: "Flora Stacking Ring",
    category: "Rings",
    price: 65,
    image: "ring",
    material: "Gold-plated sterling silver",
    tag: "",
    description:
      "A fine golden band for all your little milestones. Wear one for simplicity or stack a few to tell your story.",
    sizes: ["UK J", "UK L", "UK N", "UK P", "UK R"],
  },
  {
    id: 8,
    slug: "sunday-crystal-bracelet",
    name: "Sunday Crystal Bracelet",
    category: "Bracelets",
    price: 90,
    image: "bracelet",
    material: "Crystal & gold-plated brass",
    tag: "",
    description:
      "Easy, expressive, and full of character. An ode to the days when you have nowhere to be but yourself.",
    sizes: ["Small / Medium", "Medium / Large"],
  },
  {
    id: 9,
    slug: "aurora-crystal-pendant",
    name: "Aurora Crystal Pendant",
    category: "Necklaces",
    price: 145,
    image: "necklace",
    material: "Crystal & gold vermeil",
    tag: "NEW",
    description:
      "A jewel-toned focal point with a quietly romantic feel. Wear it against a simple neckline and let a little color tell the story.",
    sizes: ["16 inches", "18 inches", "20 inches"],
  },
  {
    id: 10,
    slug: "olivia-twist-hoops",
    name: "Olivia Twist Hoops",
    category: "Earrings",
    price: 75,
    image: "earrings",
    material: "Gold-plated sterling silver",
    tag: "NEW",
    description:
      "Soft twists catch the light from every angle. A thoughtful finishing touch for a relaxed day or a dressed-up evening.",
    sizes: ["One size"],
  },
  {
    id: 11,
    slug: "celeste-halo-ring",
    name: "Celeste Halo Ring",
    category: "Rings",
    price: 155,
    image: "ring",
    material: "Crystal & sterling silver",
    tag: "",
    description:
      "A luminous center framed by little points of light. For personal milestones, meaningful moments, and beautiful new beginnings.",
    sizes: ["UK J", "UK L", "UK N", "UK P", "UK R"],
  },
  {
    id: 12,
    slug: "amour-crystal-bracelet",
    name: "Amour Crystal Bracelet",
    category: "Bracelets",
    price: 70,
    image: "bracelet",
    material: "Crystal & gold-plated brass",
    tag: "",
    description:
      "A delicate line of sparkle to keep close. Lovely worn alone, even lovelier as a reminder of someone special.",
    sizes: ["Small / Medium", "Medium / Large"],
  },
];
const categoryDetails = {
  Necklaces: {
    fit: "Choose a 16, 18, or 20 inch chain. The position of the pendant varies with neck size and neckline.",
    styling:
      "Pair a shorter chain with a longer pendant for an effortless layered look.",
    closure: "Lobster clasp (sample specification)",
  },
  Earrings: {
    fit: "One size. Sold as a pair; check final dimensions and weight before ordering.",
    styling:
      "Let the sculptural shape stand alone, or pair with a fine necklace.",
    closure: "Hinged fastening (sample specification)",
  },
  Rings: {
    fit: "UK letter sizing. A professional finger measurement is the best starting point.",
    styling:
      "Wear as a signature piece or combine with fine bands for your own stack.",
    closure: "Closed band; not adjustable",
  },
  Bracelets: {
    fit: "Small / Medium or Medium / Large. Final wrist measurements are confirmed before a live order.",
    styling:
      "Add a little light beside a watch, or wear on its own for a delicate finish.",
    closure: "Clasp fastening (sample specification)",
  },
};
export const products = catalog.map((product) => ({
  ...product,
  sku:
    "MAG-" +
    product.category.slice(0, 3).toUpperCase() +
    "-" +
    String(product.id).padStart(3, "0"),
  ...categoryDetails[product.category],
}));
export const money = formatMoney;
export const categories = [
  "All jewelry",
  "Necklaces",
  "Earrings",
  "Rings",
  "Bracelets",
];
