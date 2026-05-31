import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./RecentlyViewed.css";

export default function RecentlyViewed() {
  const [recent, setRecent] = useState([]);

  useEffect(() => {
    try {
      setRecent(JSON.parse(localStorage.getItem("toc_recently_viewed") || "[]"));
    } catch {
      setRecent([]);
    }
  }, []);

  if (recent.length === 0) return null;

  return (
    <div className="recently-viewed">
      <p className="recently-viewed-label">Recently Viewed</p>
      <div className="recently-viewed-list">
        {recent.map((item) => (
          <Link key={item.id} to={`/cocktail/${item.id}`} className="recently-viewed-item">
            <img src={`${item.image}/small`} alt={item.name} />
            <span>{item.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
