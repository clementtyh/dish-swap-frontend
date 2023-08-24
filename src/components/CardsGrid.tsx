import recipesData from "../../mock-data/recipes.json";

import Card from "./Card";

function CardsGrid() {
  return (
    <div className="grid grid-cols-3 gap-16">
      {recipesData.map((d) => (
        <Card {...d} />
      ))}
    </div>
  );
}

export default CardsGrid;
