import React, { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { setPage } from "../../redux/features/cocktailSlice";
import Pagination from "../Pagination/Pagination";
import "./CocktailList.css";

const ITEMS_PER_PAGE = 10;

const renderCard = (part1, part2, id, index) => (
  <div
    key={id}
    className="card"
    style={{ animationDelay: `${index * 0.07}s` }}
  >
    {part1}
    <div className="white-line"></div>
    {part2}
  </div>
);

export default function CocktailList() {
  const { cocktails, loading, currentPage } = useSelector((state) => state.app);
  const dispatch = useDispatch();

  const modifiedCocktails = useMemo(
    () =>
      cocktails.map((item) => ({
        id: item.idDrink,
        name: item.strDrink,
        image: item.strDrinkThumb ? `${item.strDrinkThumb}/small` : item.strDrinkThumb,
        info: item.strAlcoholic,
        glass: item.strGlass,
      })),
    [cocktails]
  );

  const totalPages = Math.ceil(modifiedCocktails.length / ITEMS_PER_PAGE);
  const start = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginated = useMemo(
    () => modifiedCocktails.slice(start, start + ITEMS_PER_PAGE),
    [modifiedCocktails, start]
  );

  return (
    <div className="cocktail-list-section">
      {loading && <div className="loading-text">Loading...</div>}
      <h1>SWEET, YUMMY &amp; DELICIOUS</h1>

      {!loading && cocktails.length === 0 && <h1>No cocktails matched your search</h1>}

      {cocktails.length > 0 && (
        <>
          <p className="cocktails-stats">
            Showing {start + 1}–{start + paginated.length} of {modifiedCocktails.length} cocktails
          </p>
          <div className="cocktail-list-container">
            {paginated.map((item, index) => {
              const { id, name, image, info, glass } = item;

              const cardBody = (
                <div className="card-body">
                  <div className="card-title">Name: {name}</div>
                  {glass && <div className="card-title">Glass: {glass}</div>}
                  {info && <div className="card-text">Info: {info}</div>}
                  <Link to={`/cocktail/${id}`}>
                    <button>Details</button>
                  </Link>
                </div>
              );

              const cardImage = (
                <div className="card-image-container">
                  <img src={image} alt={name} />
                </div>
              );

              return index % 2
                ? renderCard(cardBody, cardImage, id, index)
                : renderCard(cardImage, cardBody, id, index);
            })}
          </div>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(page) => dispatch(setPage(page))}
          />
        </>
      )}
    </div>
  );
}

