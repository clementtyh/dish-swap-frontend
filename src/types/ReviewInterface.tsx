interface Review {
  _id: string;
  text: string;
  rating: number;
  recipe_id: string;
  created_by: string;
  last_updated_by: string;
}

export default Review;
