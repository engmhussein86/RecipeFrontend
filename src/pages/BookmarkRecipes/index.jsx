import React, { useEffect, useState } from 'react';
import axios from 'axios';
import RecipeCard from '../../components/RecipeCard';


function BookmarkRecipes() {
  const [bookmarkedRecipes, setBookmarkedRecipes] = useState([]);
  const [bookmarks, setBookmarks] = useState([]);

  useEffect(() => {
    const fetchBookmarkedRecipes = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:4000/bookmarks', {
          headers: { 'x-auth-token': token },
        });
        const bookmarkedRecipeIds = res.data.map(bookmark => bookmark._id);
        setBookmarks(bookmarkedRecipeIds);

        const recipesRes = await axios.get('http://localhost:4000/recipes');
        const filteredRecipes = recipesRes.data.filter(recipe =>
          bookmarkedRecipeIds.includes(recipe._id)
        );
        setBookmarkedRecipes(filteredRecipes);
      } catch (err) {
        console.error('Error fetching bookmarked recipes', err);
      }
    };

    fetchBookmarkedRecipes();
  }, []);

  const handleDelete = (id) => {
    setBookmarkedRecipes(bookmarkedRecipes.filter(recipe => recipe._id !== id));
  };

  const handleBookmark = (recipeId) => {
    setBookmarks((prevBookmarks) => {
      if (prevBookmarks.includes(recipeId)) {
        return prevBookmarks.filter(id => id !== recipeId);
      } else {
        return [...prevBookmarks, recipeId];
      }
    });
    setBookmarkedRecipes((prevRecipes) =>
      prevRecipes.filter(recipe => recipe._id !== recipeId)
    );
  };

  return (
    <div className="container mt-5">
      <h2>Bookmarked Recipes</h2>
      <div className="row">
        {bookmarkedRecipes.map((recipe) => (
          <RecipeCard
            key={recipe._id}
            recipe={recipe}
            onDelete={handleDelete}
            onBookmark={handleBookmark}
            isBookmarked={bookmarks.includes(recipe._id)}
          />
        ))}
      </div>
    </div>
  );
}

export default BookmarkRecipes;
