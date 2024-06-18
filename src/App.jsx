import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ProjectsPage from "./pages/ProjectsPage";
import NavBar from "./components/NavBar";
import ProjectDetails from "./pages/ProjectDetails";

//
import { useState } from "react";
import { ThemeContext } from "./context/ThemeContext";
import MainLayout from "./components/MainLayout";
import UserProvider from "./context/UserContext";

import "./App.css";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CreateRecipe from "./pages/CreateRecipe";
import BookmarkRecipes from "./pages/BookmarkRecipes";
import RecipeDetails from "./pages/RecipeDetails";

function App() {
  const [theme, setTheme] = useState("light");

  return (
    <>
      <ThemeContext.Provider value={{ theme, setTheme }}>
        <MainLayout>
          <UserProvider>
            <NavBar />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/Login" element={<Login />} />
              <Route path="/Register" element={<Register />} />
              <Route path="/CreateRecipe" element={<CreateRecipe />} />
              <Route path="/BookmarkRecipes" element={<BookmarkRecipes />} />
              <Route path="/Recipes/:id" element={<RecipeDetails />} />
            </Routes>
          </UserProvider>
        </MainLayout>
      </ThemeContext.Provider>
    </>
  );
}

export default App;