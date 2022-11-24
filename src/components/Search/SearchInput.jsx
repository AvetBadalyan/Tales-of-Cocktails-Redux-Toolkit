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
    <section className="section search">
      <form className="search-form" onSubmit={submitHandler}>
        <div className="form-control">
          <label htmlFor="name">Search Cocktail</label>
          <input
            type="text"
            onChange={changeHandle}
            name="name"
            id="name"
            ref={searchValue}
          />
        </div>
      </form>
    </section>
  );
}
