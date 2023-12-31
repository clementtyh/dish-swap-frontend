// @ts-nocheck
import IFilter from "../types/FilterInterface.js";
import { useMemo } from "react";

const difficultyLevelsMap = {
  easy: "1",
  medium: "2",
  hard: "3",
};

function Filter({ filters, setFilters, isOpen, setIsOpen }: IFilter) {
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
          <h3 className="text-md md:text-lg font-semibold">Difficulty</h3>
          <div className="py-3">
            <div className="pb-1">
              <input
                type="checkbox"
                className="mr-3 checkbox checkbox-primary checkbox-sm md:checkbox-md"
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
                          (lvl: string) =>
                            lvl !== difficultyLevelsMap[e.target.value]
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
              <span className="text-sm md:text-base">Easy</span>
            </div>
            <div className="pb-1">
              <input
                type="checkbox"
                className="mr-3 checkbox checkbox-primary checkbox-sm md:checkbox-md"
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
              <span className="text-sm md:text-base">Medium</span>
            </div>
            <div className="pb-1">
              <input
                type="checkbox"
                className="mr-3 checkbox checkbox-primary checkbox-sm md:checkbox-md"
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
              <span className="text-sm md:text-base">Hard</span>
            </div>
          </div>
        </div>
        <div className="divider"></div>
        <div className="p-2">
          <h3 className="text-md md:text-lg font-semibold">Number of Ingredients</h3>
          <div className="py-3">
            <div className="pb-2">
              <input
                type="radio"
                className="mr-3 radio radio-primary radio-sm md:radio-md"
                style={{ marginBottom: "-6px" }}
                value="1"
                name="ingredients"
                checked={filters.ingredients === "1"}
                onChange={(e) =>
                  setFilters({ ...filters, ingredients: e.target.value })
                }
              />
              <span className="text-sm md:text-base">Max 5</span>
            </div>
            <div className="pb-1">
              <input
                type="radio"
                className="mr-3 radio radio-primary radio-sm md:radio-md"
                style={{ marginBottom: "-6px" }}
                value="2"
                name="ingredients"
                checked={filters.ingredients === "2"}
                onChange={(e) =>
                  setFilters({ ...filters, ingredients: e.target.value })
                }
              />
              <span className="text-sm md:text-base">10 & below</span>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}

export default Filter;
