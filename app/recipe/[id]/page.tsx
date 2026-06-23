import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { RecipeDetail } from "@/components/RecipeDetail";
import { RECIPES, recipeById, ageBandLabel } from "@/lib/recipes";

export const dynamicParams = false;

export function generateStaticParams() {
  return RECIPES.map((r) => ({ id: r.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const recipe = recipeById(id);
  if (!recipe) return {};
  const title = `${recipe.title} · BabyBites`;
  const desc =
    `${recipe.texture} · ${recipe.prepMins} min · ${recipe.servings} · for ${ageBandLabel(recipe)}. ` +
    `Ingredients: ${recipe.ingredients.slice(0, 3).join(", ")}.`;
  const description = desc.length > 158 ? desc.slice(0, 157) + "…" : desc;
  const url = `/recipe/${recipe.id}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { type: "article", url, title, description },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function RecipePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const recipe = recipeById(id);
  if (!recipe) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Recipe",
    name: recipe.title,
    description: `${recipe.texture} baby & toddler recipe, suitable for ${ageBandLabel(recipe)}.`,
    recipeCategory: "Baby food",
    recipeYield: recipe.servings,
    prepTime: `PT${recipe.prepMins}M`,
    totalTime: `PT${recipe.prepMins}M`,
    keywords: recipe.tags.join(", "),
    recipeIngredient: recipe.ingredients,
    recipeInstructions: recipe.steps.map((text) => ({ "@type": "HowToStep", text })),
    author: { "@type": "Organization", name: "BabyBites" },
    ...(recipe.source ? { isBasedOn: recipe.source.url } : {}),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <RecipeDetail recipe={recipe} />
    </>
  );
}
