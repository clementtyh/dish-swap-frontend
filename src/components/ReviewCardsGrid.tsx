import ReviewCard from "./ReviewCard.js";

import IReview from "../types/ReviewInterface.js";

interface ReivewCardsGridProps {
  cards: IReview[];
}

function ReviewCardsGrid({ cards }: ReivewCardsGridProps) {
  return (
    <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
      {cards.map((card) => (
        <ReviewCard
          key={`${card.created_by.display_name}: ${card.rating}`}
          {...card}
        />
      ))}
    </div>
  );
}

export default ReviewCardsGrid;
