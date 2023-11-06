import Container from "../components/Container.js";
import settingsIcon from "../content/svg/settingsIcon.svg";
import { useNavigate } from "react-router-dom";
import urlcat from "urlcat";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import axios from "axios";
import ITokenValid from "../types/TokenValidInterface.js";
import verifyToken from "../functions/verifyToken.js";
import UnauthorisedPage from "./UnauthorisedPage.js";
import IProfileDetails from "../types/ProfileDetailsInterface.js";
import CardsGrid from "../components/CardsGrid.js";
import ReviewCardsGrid from "../components/ReviewCardsGrid.js";
import PaginationButtons from "../components/PaginationButtons.js";
import IRecipe from "../types/RecipeInterface.js";
import { ProfileReview as IReview } from "../types/ReviewInterface.js";

const SERVER = import.meta.env.PROD
  ? import.meta.env.VITE_API_URL_PROD
  : import.meta.env.VITE_API_URL_DEV;

interface IRecipesData {
  count: number;
  recipes: IRecipe[];
}

interface IReviewsData {
  count: number;
  reviews: IReview[];
}

const tabItems = ["Flavourmarks", "Recipes", "Reviews"];

function Profile({ setIsTokenValid, isTokenValid }: ITokenValid) {
  const token = sessionStorage.getItem("token");
  const navigate = useNavigate();
  const [profileDetails, setProfileDetails] = useState<IProfileDetails>({
    email: "",
    display_name: "",
  });
  const getUserUrl = urlcat(SERVER, "/user/get_user");
  const [tab, setTab] = useState("Recipes");
  const [page, setPage] = useState(1);

  const {
    isLoading: isLoadingFlavourmarks,
    isError: isErrorFlavourmarks,
    data: flavourmarksData,
  } = useQuery({
    queryKey: ["profile-flavourmarks", page],
    queryFn: async (): Promise<IRecipesData> => {
      const response = await fetch(
        `${
          import.meta.env.PROD
            ? import.meta.env.VITE_API_URL_PROD
            : import.meta.env.VITE_API_URL_DEV
        }/recipe/flavourmarks`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const count = parseInt(response.headers.get("x-total-count") as string);
      const recipes = await response.json();
        console.log(recipes)
      return {
        count,
        recipes,
      };
    },
  });

  const {
    isLoading: isLoadingRecipes,
    isError: isErrorRecipes,
    data: recipesData,
  } = useQuery({
    queryKey: ["profile-recipes", page],
    queryFn: async (): Promise<IRecipesData> => {
      const response = await fetch(
        `${
          import.meta.env.PROD
            ? import.meta.env.VITE_API_URL_PROD
            : import.meta.env.VITE_API_URL_DEV
        }/recipe/profile`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const count = parseInt(response.headers.get("x-total-count") as string);
      const recipes = await response.json();

      return {
        count,
        recipes,
      };
    },
  });

  const {
    isLoading: isLoadingReviews,
    isError: isErrorReviews,
    data: reviewsData,
  } = useQuery({
    queryKey: ["profile-reviews", page],
    queryFn: async (): Promise<IReviewsData> => {
      const response = await fetch(
        `${
          import.meta.env.PROD
            ? import.meta.env.VITE_API_URL_PROD
            : import.meta.env.VITE_API_URL_DEV
        }/review/profile`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const count = parseInt(response.headers.get("x-total-count") as string);
      const reviews = await response.json();

      return {
        count,
        reviews,
      };
    },
  });

  //check if token valid
  useEffect(() => {
    const authenticate = async () => {
      (await verifyToken()) ? setIsTokenValid(true) : setIsTokenValid(false);
    };

    authenticate();
  }, []);

  useEffect(() => {
    axios
      .get(getUserUrl, {
        headers: { Authorization: "Bearer " + token },
      })
      .then((res) => setProfileDetails(res.data.payload))
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <Container>
        {isTokenValid ? (
          <div className="justify-center mt-32">
            <div className="flex justify-center w-full my-8">
              <div className="card w-96 bg-[#E6E6CB]">
                <div className="flex justify-end mt-3 mr-3">
                  <button data-test="profile-settings-button" onClick={() => navigate("/settings")}>
                    <img className="h-10" src={settingsIcon} />
                  </button>
                </div>
                <div className="justify-center avatar">
                  <div className="w-48 rounded-full">
                    <img src="https://www.womansworld.com/wp-content/uploads/2024/08/cute-cats.jpg?w=953" />
                  </div>
                </div>
                <div className="card-body">
                  <h2 className="justify-center card-title">
                    {profileDetails.display_name}
                  </h2>
                  {/* <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="flex justify-center">Following</p>
                      <p className="flex justify-center">42</p>
                    </div>
                    <div>
                      <p className="flex justify-center">Followers</p>
                      <p className="flex justify-center">893</p>
                    </div>
                  </div> */}
                </div>
              </div>
            </div>
            <div className="col-start-1 col-end-9 my-16">
              <div className="grid grid-cols-3 gap-1 btn-group">
                {tabItems.map((item) => {
                  return (
                    <button
                    data-test={`profile-${item}-button`}
                      className={`btn ${tab === item ? "btn-active" : null}`}
                      onClick={() => {
                        setTab(item);
                        setPage(1);
                      }}
                    >
                      {item}
                    </button>
                  );
                })}
              </div>
            </div>
            <div>
              {(() => {
                switch (tab) {
                  case "Flavourmarks":
                    return (
                      !isLoadingFlavourmarks &&
                      !isErrorFlavourmarks &&
                      flavourmarksData && (
                        <>
                          <CardsGrid cards={flavourmarksData.recipes} />
                          <PaginationButtons
                            pages={Math.ceil(flavourmarksData.count / 9)}
                            page={page}
                            setPage={setPage}
                          />
                        </>
                      )
                    );
                  case "Recipes":
                    return (
                      !isLoadingRecipes &&
                      !isErrorRecipes &&
                      recipesData && (
                        <>
                          <CardsGrid cards={recipesData.recipes} />
                          <PaginationButtons
                            pages={Math.ceil(recipesData.count / 9)}
                            page={page}
                            setPage={setPage}
                          />
                        </>
                      )
                    );
                  case "Reviews":
                    return (
                      !isLoadingReviews &&
                      !isErrorReviews &&
                      reviewsData && (
                        <>
                          <ReviewCardsGrid
                            cards={reviewsData.reviews}
                            isProfile={true}
                          />
                          <PaginationButtons
                            pages={Math.ceil(reviewsData.count / 9)}
                            page={page}
                            setPage={setPage}
                          />
                        </>
                      )
                    );
                }
              })()}
            </div>
          </div>
        ) : (
          <UnauthorisedPage />
        )}
      </Container>
    </>
  );
}

export default Profile;
