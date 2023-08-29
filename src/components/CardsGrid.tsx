import Card from "./Card";

import ICard from "../types/CardInterface";

interface CardsGridProps {
  cards: ICard[];
}

function CardsGrid({ cards }: CardsGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-16">
      {cards.map((card) => (
        <Card {...card} />
      ))}
    </div>
  );
}

export default CardsGrid;
