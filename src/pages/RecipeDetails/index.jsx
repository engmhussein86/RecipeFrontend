import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaEdit, FaTrash, FaBookmark , FaRegBookmark } from 'react-icons/fa';
import { Link } from "react-router-dom";
import RecipeCard from '../../components/RecipeCard';
import DetailedRecipeCard from '../../components/DetailedRecipeCard';
import getBaseUrl from '../../utils/getBaseUrl';

export default function RecipeDetails(){
  const baseURL = getBaseUrl();
  const navigateTo = useNavigate();
    const params = useParams();
    console.log(params);
    const [recipe, setRecipe] = useState(null);
    const [isBookmarked, setIsBookmarked] = useState(false);

    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchRecipe = async () => {
          try {
            const res = await axios.get(`${baseURL}/recipes/${params.id}`);
            setRecipe(res.data);
          } catch (err) {
            console.error('Error fetching recipe', err);
          }
        };

        const fetchBookmarks = async () => {
          try {
            const res = await axios.get(`${baseURL}/bookmarks`, {
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
    navigateTo('/'); 
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