import type { Recipe } from "./types";

/**
 * Build a consolidated grocery list from a set of planned recipes.
 *
 * Tier 1 scope: recipe `ingredients` are unstructured free text
 * ("1 small carrot, diced"), so we canonicalise each line to a grocery item
 * and DEDUPE by name — we do NOT sum quantities. The UI says so. Items group
 * into supermarket aisles; anything we can't recognise falls through as a
 * lightly-cleaned raw string so nothing is silently dropped.
 */

export type Aisle = "Produce" | "Proteins" | "Dairy & chilled" | "Pantry" | "Other";

export type GroceryItem = { name: string; aisle: Aisle; recipes: string[] };
export type GrocerySection = { aisle: Aisle; items: GroceryItem[] };

const AISLE_ORDER: Aisle[] = ["Produce", "Proteins", "Dairy & chilled", "Pantry", "Other"];

// Ordered specific→general: the first keyword found as a substring wins, so
// "sweet potato" must precede "potato", "cream cheese" precede "cheese", etc.
const CANON: { match: string[]; name: string; aisle: Aisle }[] = [
  // --- Produce ---
  { match: ["sweet potato"], name: "Sweet potato", aisle: "Produce" },
  { match: ["potato"], name: "Potato", aisle: "Produce" },
  { match: ["spring onion", "scallion"], name: "Spring onion", aisle: "Produce" },
  { match: ["onion"], name: "Onion", aisle: "Produce" },
  { match: ["avocado"], name: "Avocado", aisle: "Produce" },
  { match: ["banana"], name: "Banana", aisle: "Produce" },
  { match: ["pumpkin"], name: "Pumpkin", aisle: "Produce" },
  { match: ["carrot"], name: "Carrot", aisle: "Produce" },
  { match: ["broccoli"], name: "Broccoli", aisle: "Produce" },
  { match: ["cauliflower"], name: "Cauliflower", aisle: "Produce" },
  { match: ["spinach"], name: "Spinach", aisle: "Produce" },
  { match: ["courgette", "zucchini"], name: "Courgette", aisle: "Produce" },
  { match: ["sweetcorn", "corn"], name: "Corn", aisle: "Produce" },
  { match: ["napa", "cabbage"], name: "Cabbage", aisle: "Produce" },
  { match: ["cherry tomato", "tomato"], name: "Tomato", aisle: "Produce" },
  { match: ["celery"], name: "Celery", aisle: "Produce" },
  { match: ["garlic"], name: "Garlic", aisle: "Produce" },
  { match: ["ginger"], name: "Ginger", aisle: "Produce" },
  { match: ["mushroom"], name: "Mushroom", aisle: "Produce" },
  { match: ["bell pepper", "red pepper", "capsicum"], name: "Bell pepper", aisle: "Produce" },
  { match: ["leek"], name: "Leek", aisle: "Produce" },
  { match: ["peas"], name: "Peas", aisle: "Produce" },
  { match: ["okra"], name: "Okra", aisle: "Produce" },
  { match: ["radish"], name: "Radish", aisle: "Produce" },
  { match: ["pear"], name: "Pear", aisle: "Produce" },
  { match: ["apple"], name: "Apple", aisle: "Produce" },
  { match: ["mango"], name: "Mango", aisle: "Produce" },
  { match: ["papaya"], name: "Papaya", aisle: "Produce" },
  { match: ["blueberry", "blueberries"], name: "Blueberries", aisle: "Produce" },
  { match: ["raspberry", "raspberries"], name: "Raspberries", aisle: "Produce" },
  { match: ["yam"], name: "Yam", aisle: "Produce" },
  { match: ["basil"], name: "Basil", aisle: "Produce" },
  // --- Proteins ---
  { match: ["salmon"], name: "Salmon", aisle: "Proteins" },
  { match: ["cod"], name: "Cod", aisle: "Proteins" },
  { match: ["tuna"], name: "Tuna", aisle: "Proteins" },
  { match: ["sardine"], name: "Sardines", aisle: "Proteins" },
  { match: ["threadfin", "white fish", "fish fillet", "fish"], name: "White fish", aisle: "Proteins" },
  { match: ["prawn", "shrimp"], name: "Prawns", aisle: "Proteins" },
  { match: ["scallop"], name: "Scallops", aisle: "Proteins" },
  { match: ["chicken"], name: "Chicken", aisle: "Proteins" },
  { match: ["beef", "oxtail"], name: "Beef", aisle: "Proteins" },
  { match: ["pork"], name: "Pork", aisle: "Proteins" },
  { match: ["lamb"], name: "Lamb", aisle: "Proteins" },
  { match: ["tofu", "soybean curd"], name: "Tofu", aisle: "Proteins" },
  { match: ["lentil"], name: "Red lentils", aisle: "Proteins" },
  { match: ["chickpea"], name: "Chickpeas", aisle: "Proteins" },
  { match: ["egg"], name: "Eggs", aisle: "Proteins" },
  // --- Dairy & chilled ---
  { match: ["cream cheese"], name: "Cream cheese", aisle: "Dairy & chilled" },
  { match: ["ricotta"], name: "Ricotta", aisle: "Dairy & chilled" },
  { match: ["cheese", "parmesan", "cheddar"], name: "Cheese", aisle: "Dairy & chilled" },
  { match: ["yoghurt", "yogurt"], name: "Yoghurt", aisle: "Dairy & chilled" },
  { match: ["butter"], name: "Butter", aisle: "Dairy & chilled" },
  { match: ["milk"], name: "Milk", aisle: "Dairy & chilled" },
  // --- Pantry ---
  { match: ["peanut butter", "nut butter"], name: "Peanut butter", aisle: "Pantry" },
  { match: ["tahini"], name: "Tahini", aisle: "Pantry" },
  { match: ["spaghetti", "macaroni", "pasta", "udon", "noodle"], name: "Pasta / noodles", aisle: "Pantry" },
  { match: ["rice"], name: "Rice", aisle: "Pantry" },
  { match: ["oat"], name: "Oats", aisle: "Pantry" },
  { match: ["quinoa"], name: "Quinoa", aisle: "Pantry" },
  { match: ["barley"], name: "Barley", aisle: "Pantry" },
  { match: ["buckwheat"], name: "Buckwheat", aisle: "Pantry" },
  { match: ["flour"], name: "Flour", aisle: "Pantry" },
  { match: ["chia"], name: "Chia seeds", aisle: "Pantry" },
  { match: ["coconut"], name: "Coconut milk", aisle: "Pantry" },
  { match: ["cashew"], name: "Cashews", aisle: "Pantry" },
  { match: ["sesame"], name: "Sesame", aisle: "Pantry" },
  { match: ["seaweed", "nori"], name: "Seaweed", aisle: "Pantry" },
  { match: ["maple"], name: "Maple syrup", aisle: "Pantry" },
  { match: ["red date"], name: "Red dates", aisle: "Pantry" },
  { match: ["stock", "broth"], name: "Unsalted stock", aisle: "Pantry" },
  { match: ["passata", "tomato purée", "tomato puree"], name: "Passata", aisle: "Pantry" },
  { match: ["olive oil", "oil"], name: "Cooking oil", aisle: "Pantry" },
  { match: ["pita"], name: "Pita bread", aisle: "Pantry" },
  { match: ["tortilla"], name: "Tortillas", aisle: "Pantry" },
  { match: ["bread"], name: "Bread", aisle: "Pantry" },
  { match: ["cocoa", "chocolate"], name: "Cocoa / chocolate", aisle: "Pantry" },
];

// Lines that aren't really a shopping item (you already have these, or they're
// fluids measured to taste). Skipped before canonicalising.
const SKIP_OTHER = new Set(["water", "salt", "pepper", "sea salt", "black pepper"]);

function canonicalize(ingredient: string): { name: string; aisle: Aisle } | null {
  const s = ingredient.toLowerCase();
  if (/breast milk|formula/.test(s)) return null; // not a grocery item
  for (const c of CANON) {
    if (c.match.some((m) => s.includes(m))) return { name: c.name, aisle: c.aisle };
  }
  // Fallback: drop parenthetical notes, leading quantity and trailing prep,
  // then title-case the remaining noun so unknown items still appear.
  const cleaned = ingredient
    .replace(/\([^)]*\)/g, "")
    .replace(/^[^a-zA-Z]+/, "")
    .replace(/,.*$/, "")
    .trim();
  if (!cleaned) return null;
  // Seasoning / fluid / "to taste" lines aren't real shopping items.
  if (/\b(water|salt|pepper|to taste|to serve)\b/i.test(cleaned)) return null;
  const name = cleaned[0].toUpperCase() + cleaned.slice(1);
  if (SKIP_OTHER.has(name.toLowerCase())) return null;
  return { name, aisle: "Other" };
}

export function buildGroceryList(recipes: Recipe[]): GrocerySection[] {
  const map = new Map<string, GroceryItem>(); // key: `${aisle}|${name}`
  for (const r of recipes) {
    for (const ing of r.ingredients) {
      const canon = canonicalize(ing);
      if (!canon) continue;
      const key = `${canon.aisle}|${canon.name.toLowerCase()}`;
      const existing = map.get(key);
      if (existing) {
        if (!existing.recipes.includes(r.title)) existing.recipes.push(r.title);
      } else {
        map.set(key, { name: canon.name, aisle: canon.aisle, recipes: [r.title] });
      }
    }
  }
  return AISLE_ORDER.map((aisle) => ({
    aisle,
    items: [...map.values()]
      .filter((i) => i.aisle === aisle)
      .sort((a, b) => a.name.localeCompare(b.name)),
  })).filter((s) => s.items.length > 0);
}
