import Card from "./Card.js";

import IRecipe from "../types/RecipeInterface.js";

interface CardsGridProps {
  cards: IRecipe[];
  page: number;
}

function CardsGrid({ cards, page }: CardsGridProps) {
  return (
    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-16">
      {cards.map((card, idx) => (
        <Card key={card._id} page={page} idx={idx} {...card} />
      ))}
    </div>
  );
}

export default CardsGrid;
