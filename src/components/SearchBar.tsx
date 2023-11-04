

// import { useMemo, useState } from "react";
import searchIcon from "../content/svg/searchIcon.svg"
import SearchQuery from "../types/SearchQueryInterface.js";


function SearchBar({ searchQuery, setSearchQuery }: SearchQuery) {

  return (
      <form>
        <div className="relative w-full rounded-2xl">
        <input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          type="text"
          placeholder="I'm looking for..."
          name="q"
          className="border-2 border-green-900 bg-transparent h-10 px-5 pr-16 rounded-2xl w-full text-xs md:text-sm placeholder-green-900 focus:placeholder-gray-400 focus:border-yellow-400 focus:outline-none text-green-900"
        />
        <button className="absolute top-2 right-5"><img src={searchIcon} /></button>
        </div>
      </form>
  );
}

export default SearchBar;
