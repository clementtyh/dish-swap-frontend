import recipesData from "../../mock-data/recipes.json";

import Card from "./Card";

function CardsGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-16">
      {recipesData.map((d) => (
        <Card {...d} />
      ))}
    </div>
  );
}

export default CardsGrid;
