import { Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header/Header";
import About from "./pages/About/About";
import Cocktails from "./pages/Cocktails/Cocktails";
import Home from "./pages/Home/Home";
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
      </Routes>
    </div>
  );
}

export default App;
