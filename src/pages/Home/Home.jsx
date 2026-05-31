import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BASE } from "../../redux/features/cocktailSlice";
import "./Home.css";

const getTodayString = () => new Date().toISOString().split("T")[0];

export default function Home() {
  const [cotd, setCotd] = useState(null);
  const [cotdLoading, setCotdLoading] = useState(true);

  useEffect(() => {
    const today = getTodayString();
    try {
      const cached = JSON.parse(localStorage.getItem("toc_cotd") || "null");
      if (cached && cached.date === today) {
        setCotd(cached.cocktail);
        setCotdLoading(false);
        return;
      }
    } catch {}

    fetch(`${BASE}/random.php`)
      .then((r) => r.json())
      .then((data) => {
        const d = data.drinks[0];
        const cocktail = { id: d.idDrink, name: d.strDrink, image: d.strDrinkThumb };
        localStorage.setItem("toc_cotd", JSON.stringify({ date: today, cocktail }));
        setCotd(cocktail);
        setCotdLoading(false);
      })
      .catch(() => setCotdLoading(false));
  }, []);

  return (
    <div className="home-page">
      <div className="home-cotd">
        <p className="cotd-label">Cocktail of the Day</p>
        {cotdLoading && <p className="cotd-loading">Mixing...</p>}
        {cotd && (
          <Link to={`/cocktail/${cotd.id}`} className="cotd-card">
            <img src={`${cotd.image}/medium`} alt={cotd.name} className="cotd-image" />
            <p className="cotd-name">{cotd.name}</p>
          </Link>
        )}
      </div>

      <Link to="/cocktails">
        <button>Explore All Cocktails 🍸</button>
      </Link>
    </div>
  );
}
