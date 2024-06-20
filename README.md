# Recipe Manager Frontend

This is the frontend part of the Recipe Manager application built with React. It allows users to register, login, view recipes, search for recipes, bookmark recipes, and manage their own recipes.

## Deployment link

- Frontend => https://recipes-ps.netlify.app/
- Backend => https://recipebackend-lx5k.onrender.com

## Features

- User Authentication (Register, Login)
- View Recipes
- Search Recipes
- Bookmark Recipes
- Add/Edit/Delete Recipes
- View Random Recipe (from external Api https://www.themealdb.com/api/json/v1/1/random.php)

## Technologies Used

- React
- React Router
- Axios
- Bootstrap
- React Icons


## Installation

1. Clone the repository:

    ```sh
    git clone https://github.com/engmhussein86/RecipeFrontend.git
    cd RecipeFrontend
    ```

2. Install dependencies:

    ```sh
    npm install
    ```
3. To clone backend repository :

    ```sh
    git clone https://github.com/engmhussein86/RecipeBackend.git
    ```

4. Change src/utils/getBaseUrl.js file to

    ```getBaseUrl.js
    const getBaseUrl = () => {
    if (window.location.hostname === 'localhost') {
      return 'http://localhost:4000'; # or your development backend URL
    } else {
      return 'https://recipebackend-lx5k.onrender.com'; # or your production backend URL
    } }; 
    ```

## Running the Application

1. Start the development server:

    ```sh
    npm run dev
    ```

2. Open your browser and navigate to `http://localhost:5173` (or the port specified).

## Deployment

To build the project for production, run:

```sh
npm run build
