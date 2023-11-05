import Card from "./Card.js";

import IRecipe from "../types/RecipeInterface.js";

interface CardsGridProps {
  cards: IRecipe[];
}

function CardsGrid({ cards }: CardsGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10 xl:gap-16">
      {Array.isArray(cards) ? cards.map((card, i) => (
        <Card key={card._id} {...card} />
      )) : "No available recipes currently"}
    </div>
  );
}

export default CardsGrid;
