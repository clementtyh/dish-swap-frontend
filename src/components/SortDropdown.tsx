import SortValue from "../types/SortValueInterface.js";
// import sortDropdownArrow from "../content/svg/sortDropdownArrow.svg"

function SortDropdown({ sortValue, setSortValue }: SortValue) {
  return (
    <>
      <div>
        <select
          value={sortValue}
          onChange={(e) => setSortValue(e.target.value)}
          className="h-10 px-5 rounded-2xl w-1/8 text-sm"
          style={{backgroundColor: "#DDE0BD"}}
        >
          {/* <option value={sortValue}>Sort</option> */}
          <option value="newest">Newest</option>
          {/* <option value="rating">Highest Rated</option> */}
          <option value="difficulty">Difficulty Level</option>
          {/* <option value="calories">Least Calories</option> */}
        </select>
      </div>
    </>
  );
}

export default SortDropdown;
