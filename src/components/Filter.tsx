// @ts-nocheck
import IFilter from "../types/FilterInterface.js";
import { useMemo } from "react";

const difficultyLevelsMap = {
  easy: "1",
  medium: "2",
  hard: "3",
};



function Filter({
  filters,
  setFilters,
  recipesData,
  setFilteredRecipes,
  isOpen,
  setIsOpen,
}: IFilter) {
  let searchParams = useMemo(
    () => new URLSearchParams(window.location.search),
    []
  );

  // SortMap
  const difficultyLevelsMap = {
    easy: "1",
    medium: "2",
    hard: "3",
  };

  return (
    <>
      <form className="p-4">
        <div className="p-2">
          <h3 className="text-2xl font-semibold">Difficulty</h3>
          <div className="py-3">
            <div className="pb-1">
              <input
                type="checkbox"
                className="checkbox checkbox-primary mr-3"
                style={{ marginBottom: "-5px" }}
                value="easy"
                name="difficulty"
                checked={filters.difficulty
                  ?.split("-")
                  ?.includes(difficultyLevelsMap["easy"])}
                onChange={(e) => {
                  let currentDifficultySelection = filters.difficulty
                    ? filters.difficulty?.split("-")
                    : [];
                  if (
                    currentDifficultySelection?.includes(
                      difficultyLevelsMap[e.target.value]
                    )
                  ) {
                    setFilters({
                      ...filters,
                      difficulty: currentDifficultySelection
                        .filter(
                          (lvl:string) => lvl !== difficultyLevelsMap[e.target.value]
                        )
                        .join("-"),
                    });
                  } else {
                    setFilters({
                      ...filters,
                      difficulty: [
                        difficultyLevelsMap[e.target.value],
                        ...currentDifficultySelection,
                      ].join("-"),
                    });
                  }
                }}
              />
              <spam className="text-lg ">Easy</spam>
            </div>
            <div className="pb-1">
              <input
                type="checkbox"
                className="checkbox checkbox-primary mr-3"
                style={{ marginBottom: "-5px" }}
                value="medium"
                name="difficulty"
                checked={filters.difficulty
                  ?.split("-")
                  ?.includes(difficultyLevelsMap["medium"])}
                onChange={(e) => {
                  let currentDifficultySelection = filters.difficulty
                    ? filters.difficulty?.split("-")
                    : [];
                  if (
                    currentDifficultySelection?.includes(
                      difficultyLevelsMap[e.target.value]
                    )
                  ) {
                    setFilters({
                      ...filters,
                      difficulty: currentDifficultySelection
                        .filter(
                          (lvl) => lvl !== difficultyLevelsMap[e.target.value]
                        )
                        .join("-"),
                    });
                  } else {
                    if (
                      currentDifficultySelection?.includes(
                        difficultyLevelsMap["easy"]
                      )
                    ) {
                      // setFilters({...filters, difficulty: [...currentDifficultySelection, difficultyLevelsMap[e.target.value]].join("-")});
                      setFilters({
                        ...filters,
                        difficulty: currentDifficultySelection
                          .toSpliced(1, 0, difficultyLevelsMap[e.target.value])
                          .join("-"),
                      });
                    } else {
                      setFilters({
                        ...filters,
                        difficulty: [
                          difficultyLevelsMap[e.target.value],
                          ...currentDifficultySelection,
                        ].join("-"),
                      });
                    }
                  }
                }}
              />
              <spam className="text-lg ">Medium</spam>
            </div>
            <div className="pb-1">
              <input
                type="checkbox"
                className="checkbox checkbox-primary mr-3"
                style={{ marginBottom: "-5px" }}
                value="hard"
                name="difficulty"
                checked={filters.difficulty
                  ?.split("-")
                  ?.includes(difficultyLevelsMap["hard"])}
                onChange={(e) => {
                  let currentDifficultySelection = filters.difficulty
                    ? filters.difficulty?.split("-")
                    : [];
                  if (
                    currentDifficultySelection?.includes(
                      difficultyLevelsMap[e.target.value]
                    )
                  ) {
                    setFilters({
                      ...filters,
                      difficulty: currentDifficultySelection
                        .filter(
                          (lvl) => lvl !== difficultyLevelsMap[e.target.value]
                        )
                        .join("-"),
                    });
                  } else {
                    setFilters({
                      ...filters,
                      difficulty: [
                        ...currentDifficultySelection,
                        difficultyLevelsMap[e.target.value],
                      ].join("-"),
                    });
                  }
                }}
              />
              <spam className="text-lg ">Hard</spam>
            </div>
          </div>
        </div>
        <div className="divider"></div>
        <div className="p-2">
          <h3 className="text-2xl font-semibold">Number of Ingredients</h3>
          <div className="py-3">
            <div className="pb-2">
            <input
            type="radio"
            className="radio radio-primary mr-3"
            style={{ marginBottom: "-6px" }}
            value="1"
            name="ingredients"
            checked={filters.ingredients === "1"}
            onChange={(e) =>
              setFilters({ ...filters, ingredients: e.target.value })
            }
          />
          Max 5
            </div>
            <div className="pb-1">
            <input
            type="radio"
            className="radio radio-primary mr-3"
            style={{ marginBottom: "-6px" }}
            value="2"
            name="ingredients"
            checked={filters.ingredients === "2"}
            onChange={(e) =>
              setFilters({ ...filters, ingredients: e.target.value })
            }
          />
          10 & below
            </div>


          </div>

        </div>
        {/* <div>
            <h3>Calories Range</h3>
            <PriceRangeFilter minPrice={minPrice} maxPrice={maxPrice} setMinPrice={setMinPrice} setMaxPrice={setMaxPrice} filters={filters} setFilters={setFilters} />
          </div> */}
        {/* <button
            style={{marginTop: 30}}
            type="submit"
            onClick={(e) =>
              onSubmitFilter(
                e,
                filters,
                searchParams,
                recipesData,
                // filteredRecipes,
                setFilteredRecipes,
                setIsOpen,
                isOpen
              )
            }
          >
            Set Filter
          </button> */}
      </form>
    </>
  );
}

export default Filter;