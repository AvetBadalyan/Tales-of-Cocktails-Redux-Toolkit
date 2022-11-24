import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home/Home";
import SingleCocktail from "./pages/SingleCocktail/SingleCocktail";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cocktail" element={<SingleCocktail />} />
      </Routes>
    </div>
  );
}

export default App;
