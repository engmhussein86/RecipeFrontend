import { Link } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import { UserContext } from "../../context/UserContext";

export default function NavBar() {
  // Theme Context
  const themeCtx = useContext(ThemeContext);
  const { setTheme } = themeCtx;

  // User Context
  const userCtx = useContext(UserContext);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
<div className="container-fluid">
        <Link className="navbar-brand" to="/">Recipe Manager</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/Login"  >Login </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/Register" > Register</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/CreateRecipe"  > CreateRecipe </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/BookmarkRecipes"  > BookmarkRecipes </Link>
            </li>
          </ul>
        </div>

        {/* <div>
        <label htmlFor="theme-toggle" className="m5">
          Toggle Dark
          <input
            type="checkbox"
            onChange={() =>
              setTheme((prevState) =>
                prevState === "light" ? "dark" : "light",
              )
            }
          />
        </label>
      </div>

      <div>
        <h3>Hello {userCtx.name}</h3>
      </div> */}

      </div>             

      

    </nav>
  );
}