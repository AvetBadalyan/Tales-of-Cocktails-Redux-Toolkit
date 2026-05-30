import React from "react";
import "./About.css";

export default function About() {
  return (
    <section className="about-page">
      <div className="about-container">
        <div>
          <h1>About Tales of Cocktails</h1>
          <p>
            Welcome to Tales of Cocktails — your go-to guide for discovering
            cocktail recipes from around the world. Whether you're a curious
            beginner or a seasoned mixologist, there's always a new drink
            waiting to be explored.
          </p>
        </div>

        <div>
          <h1>EXPLORE THE COLLECTION</h1>
          <p>
            Browse over 160 cocktail recipes across all categories — alcoholic,
            non-alcoholic, and optional alcohol. Use the search bar to instantly
            find any cocktail by name, and discover new favourites along the way.
          </p>
        </div>

        <div>
          <h1>FULL RECIPE DETAILS</h1>
          <p>
            Each cocktail page gives you everything you need to craft the
            perfect drink: full ingredient list, step-by-step instructions,
            glass type, and category — all sourced live from the CocktailDB API.
          </p>
        </div>

        <div>
          <h1>BUILT WITH MODERN TECH</h1>
          <p>
            This app is built with React 18, Redux Toolkit for state management,
            and React Router v6 for navigation. It demonstrates clean component
            architecture, async thunks, and responsive CSS — crafted as a
            portfolio project to showcase modern front-end development skills.
          </p>
        </div>

        <div>
          <h1>DRINK RESPONSIBLY</h1>
          <p>
            Tales of Cocktails is for inspiration and education. Always drink
            responsibly and be aware of your local laws regarding alcohol
            consumption. Cheers! 🍸
          </p>
        </div>
      </div>
    </section>
  );
}
