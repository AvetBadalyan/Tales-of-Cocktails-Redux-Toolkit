import { Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header/Header";
import About from "./pages/About/About";
import Cocktails from "./pages/Cocktails/Cocktails";
import Favorites from "./pages/Favorites/Favorites";
import Home from "./pages/Home/Home";
import Ingredient from "./pages/Ingredient/Ingredient";
import SingleCocktail from "./pages/SingleCocktail/SingleCocktail";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/cocktails" element={<Cocktails />} />
        <Route path="/cocktail/:id" element={<SingleCocktail />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/ingredient/:name" element={<Ingredient />} />
      </Routes>
    </div>
  );
}

export default App;
