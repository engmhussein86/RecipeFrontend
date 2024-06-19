import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { FaEdit, FaTrash, FaBookmark , FaRegBookmark } from 'react-icons/fa';
import { Link } from "react-router-dom";
import RecipeCard from '../../components/RecipeCard';
import DetailedRecipeCard from '../../components/DetailedRecipeCard';

export default function RecipeDetails(){
    const params = useParams();
    console.log(params);
    const [recipe, setRecipe] = useState(null);
    const [isBookmarked, setIsBookmarked] = useState(false);

    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchRecipe = async () => {
          try {
            const res = await axios.get(`http://localhost:4000/recipes/${params.id}`);
            setRecipe(res.data);
          } catch (err) {
            console.error('Error fetching recipe', err);
          }
        };

        const fetchBookmarks = async () => {
          try {
            const res = await axios.get('http://localhost:4000/bookmarks', {
              headers: {'x-auth-token': token },
            });
            const bookmarks = res.data.map(bookmark => bookmark._id);
            setIsBookmarked(bookmarks.includes(params.id));
          } catch (err) {
            console.error('Error fetching bookmarks', err);
          }
        };
        
        fetchRecipe();
        fetchBookmarks();
      }, [params.id]);

      
  const handleDelete =  () => {
    alert('succesfully delete');
      history.push('/'); 
  };

  const handleBookmark = async () => {
      setIsBookmarked(!isBookmarked);
  };
    
      if (!recipe) {
        return <div>Loading...</div>;
      }

    return(
      <div className="container mt-5">
        <DetailedRecipeCard
        key={recipe._id}
        recipe ={recipe}
        onDelete={handleDelete}
        onBookmark={handleBookmark}
        isBookmarked={isBookmarked}
        />

    </div>
  );
}