export interface Review {
  _id: string;
  text: string;
  rating: number;
  recipe_id: string;
  created_by: {
    _id: string;
    display_name: string;
  };
  created_date: string;
  last_updated_by: string;
  last_updated_date: string;
}

export interface ProfileReview {
  _id: string;
  text: string;
  rating: number;
  recipe_id: string;
  created_by: string;
  created_date: string;
  last_updated_by: string;
  last_updated_date: string;
  recipe: {
    _id: string;
    recipe_name: string;
  };
}
