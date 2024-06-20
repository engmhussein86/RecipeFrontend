import React, { useEffect, useState } from 'react';
import axios from 'axios';
import RecipeCard from '../../components/RecipeCard';
import getBaseUrl from '../../utils/getBaseUrl';


export default function HomePage(){
  const baseURL = getBaseUrl();
    const [recipes, setRecipes] = useState([]);
    const [query, setQuery] = useState('');
    const [bookmarks, setBookmarks] = useState([]);

    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchRecipes = async () => {
          try {
            const res = await axios.get(`${baseURL}/recipes`);
            setRecipes(res.data);
          } catch (err) {
            console.error('Error fetching recipes', err);
          }
        };

        const fetchBookmarks = async () => {
          try {
            console.log(token);
            const res = await axios.get(`${baseURL}/bookmarks`, {
              headers: {'x-auth-token': token },
            });
            setBookmarks(res.data.map(bookmark => bookmark._id));
          } catch (err) {
            console.error('Error fetching bookmarks', err);
          }
        };
    
        fetchRecipes();
        fetchBookmarks();
      }, []);

      
  
  

      const handleSearch = async (e) => {
        e.preventDefault();
        try {
          const res = await axios.get(`${baseURL}/recipes/search?query=${query}`);
          setRecipes(res.data);
        } catch (err) {
          console.error('Error searching recipes', err);
        }
      };

      const handleDelete = (id) => {
       setRecipes(recipes.filter(recipe => recipe._id !== id));        
      };
    
      const handleBookmark = (recipeId) => {
        setBookmarks((prevBookmarks)=>{
              if(prevBookmarks.includes(recipeId)){
                return prevBookmarks.filter(id => id !== recipeId);
              }
              else{
                return [...prevBookmarks, recipeId];
              }
      });
    }

    return(
      <div className="container mt-5">
      <h2>Recipe Manager</h2>
      <form onSubmit={handleSearch} className="mb-4">
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            placeholder="Search for recipes"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button className="btn btn-primary" type="submit">Search</button>
        </div>
      </form>
      <div className="row">
        {recipes.map((recipe) => (          
            <RecipeCard 
            key={recipe._id}
            recipe ={recipe}
            onDelete={handleDelete}
            onBookmark={handleBookmark}
            isBookmarked={bookmarks.includes(recipe._id)}
              />
          
        ))}
      </div>
    </div>
  );
}