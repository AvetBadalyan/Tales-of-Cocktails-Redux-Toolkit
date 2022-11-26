import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import { fetchSearchCocktail } from "../../redux/features/cocktailSlice";
import "./SearchInput.css";

export default function SearchInput() {
  const searchValue = useRef();
  const dispatch = useDispatch();

  const changeHandle = () => {
    const searchText = searchValue.current.value;
    dispatch(fetchSearchCocktail({ searchText }));
  };

  const submitHandler = (e) => {
    e.preventDefault();
  };

  return (
    <div className="search">
      <form className="search-form" onSubmit={submitHandler}>
        <input
          type="text"
          onChange={changeHandle}
          name="name"
          id="name"
          ref={searchValue}
          placeholder="Search your favorite cocktail..."
        />
      </form>
    </div>
  );
}
