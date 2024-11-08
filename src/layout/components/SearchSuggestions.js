import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { isEmpty } from "lodash";
import { cacheSuggestions } from "../../redux/slice/searchSuggestionSlice";

const SearchSuggestions = () => {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [suggestionData, setSuggestionData] = useState([]);
  const dispatch = useDispatch();
  const cachedData = useSelector((store) => store.searchSuggestion);

  useEffect(() => {
    let timer = null;
    if (cachedData[searchInput]) {
      setSuggestionData(cachedData[searchInput]);
    } else {
      timer = setTimeout(() => searchAPI(), 200);
    }

    return () => clearTimeout(timer);
  }, [searchInput]);

  const handleSearch = (e) => {
    // dispatch(addSearchInput(searchRef.current.value));
    setSearchInput(e.target.value);
  };

  const searchAPI = async () => {
    const res = await fetch(
      `http://suggestqueries.google.com/complete/search?client=firefox&ds=yt&q=${searchInput}`
    );
    const data = await res.json();

    setSuggestionData(data[1]);

    dispatch(cacheSuggestions({ [searchInput]: data[1] }));
  };

  return (
    <div className="flex flex-col">
      <input
        value={searchInput}
        placeholder="Search for titles, genres...     🔍"
        type="text"
        className="border border-white bg-black text-sm p-2 rounded-md text-white w-56"
        onBlur={(e) => {
          e.stopPropagation();
          setShowSuggestions(false);
        }}
        onFocus={() => setShowSuggestions(true)}
        onChange={handleSearch}
      ></input>
      {showSuggestions && !isEmpty(suggestionData) && (
        <div className="w-56 h-fit bg-[#141414] text-white p-4 rounded-b-md border border-white text-sm">
          {suggestionData.map((item) => (
            <div
              key={item}
              className="cursor-default"
              onClick={(e) => {
                e.stopPropagation();
                setSearchInput(item);
              }}
            >
              {item}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
export default SearchSuggestions;
