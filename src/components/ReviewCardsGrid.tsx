import ReviewCard from "./ReviewCard.js";
import ProfileReviewCard from "./ProfileReviewCard.js";

import {
  Review as IReview,
  ProfileReview as IProfileReview,
} from "../types/ReviewInterface.js";

interface ReviewCardsGridProps {
  cards: IReview[];
  isProfile: false;
}

interface ProfileReviewCardsGridProps {
  cards: IProfileReview[];
  isProfile: true;
}

function ReviewCardsGrid({
  cards,
  isProfile,
}: ReviewCardsGridProps | ProfileReviewCardsGridProps) {
  return (
    <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
      {isProfile
        ? cards.map((card) => (
            <ProfileReviewCard
              key={`${card.recipe.recipe_name}: ${card.rating}`}
              {...card}
            />
          ))
        : cards.map((card) => (
            <ReviewCard
              key={`${card.created_by.display_name}: ${card.rating}`}
              {...card}
            />
          ))}
    </div>
  );
}

export default ReviewCardsGrid;
