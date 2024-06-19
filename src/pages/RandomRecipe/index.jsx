import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DetailedRecipeCard from '../../components/DetailedRecipeCard';

const RandomRecipe = () => {
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bookmarks, setBookmarks] = useState([]);

  const token = localStorage.getItem('token');

  const fetchRandomRecipe = async () => {
    try {
      const res = await axios.get('https://www.themealdb.com/api/json/v1/1/random.php');
      const fetchedRecipe = res.data.meals[0];
      const ingredients =[];
      
      for (let i = 1; i <= 20; i++) {
        const ingredient = fetchedRecipe[`strIngredient${i}`];
        
        if (ingredient) {
          ingredients.push( ingredient);
        }
      }

      const mappedRecipe = {
        _id: fetchedRecipe.idMeal,
        title: fetchedRecipe.strMeal,
        description: fetchedRecipe.strInstructions,
        ingredients: ingredients,
        instructions: fetchedRecipe.strInstructions,
        imageUrl: fetchedRecipe.strMealThumb,
        user: { username: 'API User' },
      };
      setRecipe(mappedRecipe);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching random recipe', err);
    }
  };

  useEffect(() => {
    fetchRandomRecipe();
  }, [token]);

  const handleDelete = (id) => {
    console.log(`Recipe with ID ${id} deleted`);
  };

  const handleBookmark = () => {
     };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mt-5">
      <h2>Random Recipe</h2>
      {recipe && (
        <DetailedRecipeCard
          recipe={recipe}
          onDelete={handleDelete}
          onBookmark={handleBookmark}
          isBookmarked={bookmarks.includes(recipe._id)}
        />
      )}
    </div>
  );
};

export default RandomRecipe;
