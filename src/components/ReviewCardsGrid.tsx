import ReviewCard from "./ReviewCard.js";

import IReview from "../types/ReviewInterface.js";

interface ReivewCardsGridProps {
  cards: IReview[];
}

function ReviewCardsGrid({ cards }: ReivewCardsGridProps) {
  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-8">
      {cards.map((card) => (
        <ReviewCard key={`${card.reviewer}: ${card.rating}`} {...card} />
      ))}
    </div>
  );
}

export default ReviewCardsGrid;
