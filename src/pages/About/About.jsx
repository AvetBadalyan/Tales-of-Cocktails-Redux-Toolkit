import React from "react";
import "./About.css";

const cards = [
  {
    icon: "🍹",
    title: "What is Tales of Cocktails?",
    text: "Your go-to guide for discovering cocktail recipes from around the world. Whether you’re a curious beginner or a seasoned mixologist, there’s always a new drink waiting to be explored.",
  },
  {
    icon: "🔍",
    title: "Explore the Collection",
    text: "Browse 160+ recipes across alcoholic, non-alcoholic, and optional alcohol categories. Filter by category, browse A–Z, or search by name instantly.",
  },
  {
    icon: "📋",
    title: "Full Recipe Details",
    text: "Every cocktail page shows ingredients (each linking to its own ingredient page), step-by-step instructions, glass type, and category — all sourced live from the CocktailDB API.",
  },
  {
    icon: "🎲",
    title: "Discover Something New",
    text: "Not sure what to try? Hit Surprise Me for a random pick, check today’s Cocktail of the Day on the home page, or revisit your recently viewed drinks.",
  },
  {
    icon: "❤️",
    title: "Save Your Favorites",
    text: "Found something you love? Save it to your Favorites with one tap. Your list is stored locally and persists across visits — no account needed.",
  },
  {
    icon: "⚙️",
    title: "Built With Modern Tech",
    text: "React 18 · Redux Toolkit · React Router v6 · CocktailDB API · Firebase Hosting. Clean component architecture, async thunks, localStorage persistence, and fully responsive CSS.",
  },
];

export default function About() {
  return (
    <section className="about-page">
      <div className="about-hero">
        <h1 className="about-title">Tales of Cocktails</h1>
        <p className="about-subtitle">A cocktail encyclopedia in your browser.</p>
      </div>

      <div className="about-grid">
        {cards.map((card) => (
          <div key={card.title} className="about-card">
            <span className="about-card-icon">{card.icon}</span>
            <h2 className="about-card-title">{card.title}</h2>
            <p className="about-card-text">{card.text}</p>
          </div>
        ))}
      </div>

      <p className="about-footer">Always drink responsibly. Cheers! 🥂</p>
    </section>
  );
}
