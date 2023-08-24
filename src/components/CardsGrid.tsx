import Card from "./Card";

function CardsGrid() {
  return (
    <div className="grid grid-cols-3 gap-16">
      <Card isBookmarked={true} />
      <Card isBookmarked={false} />
      <Card isBookmarked={false} />
      <Card isBookmarked={false} />
      <Card isBookmarked={false} />
      <Card isBookmarked={true} />
      <Card isBookmarked={false} />
    </div>
  );
}

export default CardsGrid;
