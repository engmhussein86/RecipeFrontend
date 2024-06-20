import React from 'react';
import { Link } from 'react-router-dom';
import { FaEdit, FaTrash, FaBookmark, FaRegBookmark } from 'react-icons/fa';
import axios from 'axios';
import getBaseUrl from '../../utils/getBaseUrl';
import { useNavigate } from 'react-router-dom';


const DetailedRecipeCard = ({ recipe, onDelete, onBookmark, isBookmarked }) => {
  const token = localStorage.getItem('token');
  const navigateTo = useNavigate();
  const baseURL = getBaseUrl();

  const handleDelete = async () => {
    try {
      await axios.delete(`${baseURL}/recipes/${recipe._id}`, {
        headers: { 'x-auth-token': token },
      });
      onDelete(recipe._id);  // Callback to parent component
    } catch (err) {
      console.error('Error deleting recipe', err);
    }
  };

  const handleBookmark = async () => {
    try {
      if (isBookmarked) {
        await axios.post(
          `${baseURL}/bookmarks/remove`,
          { recipeId: recipe._id },
          { headers: { 'x-auth-token': token } }
        );
      } else {
        await axios.post(
          `${baseURL}/bookmarks/add`,
          { recipeId: recipe._id },
          { headers: { 'x-auth-token': token } }
        );
      }
      onBookmark(recipe._id);  // Callback to parent component
    } catch (err) {
      console.error('Error bookmarking recipe', err);
    }
  };

  return (
    <div className="card mb-4">
        <div className="d-flex justify-content-center">
      <img src={(recipe.imageUrl? recipe.imageUrl : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCtimqUqhYHnZPcXp-w6nslx2XloJwsXVVJg&s')}  style={{ width: '500px', height: '400px' }} alt={recipe.title} />
      </div>
      <div className="card-body">
        <h3 className="card-title">{recipe.title}</h3>
        {recipe.user.username !== 'API User' && <p className="card-text">Added by: {recipe.user.username}</p>}
        
        <h5>Ingredients:</h5>
        <ul className="card-text">{recipe.ingredients.map((item)=>
        <li>{item}</li>
        )}</ul>
        <h5>Instructions:</h5>
        <p className="card-text">{recipe.instructions}</p>
        {recipe.user.username !== 'API User' && (
            <>
        <button
          className="btn btn-warning ms-2"
          onClick={handleBookmark}
        >
          {isBookmarked ? <FaBookmark /> : <FaRegBookmark />}
        </button>
        {recipe.user && (
          <>
            <Link to={`/edit-recipe/${recipe._id}`} className="btn btn-secondary ms-2">
              <FaEdit />
            </Link>
            <button className="btn btn-danger ms-2" onClick={handleDelete}>
              <FaTrash />
            </button>
          </>
        )}
        </>
        )}
      </div>
    </div>
  );
};

export default DetailedRecipeCard;
