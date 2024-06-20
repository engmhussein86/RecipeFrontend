import React from 'react';
import { Link } from 'react-router-dom';
import { FaEdit, FaTrash, FaBookmark, FaRegBookmark } from 'react-icons/fa';
import axios from 'axios';
import getBaseUrl from '../../utils/getBaseUrl';

const baseURL = getBaseUrl();

const RecipeCard = ({ recipe, onDelete, onBookmark, isBookmarked }) => {
    const token = localStorage.getItem('token');

    const handleDelete = async (id) => {
        console.log( id);
    try {   
        await axios.delete(`${baseURL}/recipes/${id}`, {
          headers: { 'x-auth-token': token },
        });
        onDelete(id);  // Callback to parent component
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
      <div className="col-md-4" key={recipe._id}>
        <div className="card mb-4">
          <img src={(recipe.imageUrl? recipe.imageUrl :'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCtimqUqhYHnZPcXp-w6nslx2XloJwsXVVJg&s')} className="card-img-top" style={{height: '300px'}} alt={recipe.title} />
          <div className="card-body">
            <h5 className="card-title">{recipe.title}</h5>
            <p className="card-text">Added by: {recipe.user.username}</p>
            <Link to={`/recipe/${recipe._id}`} className="btn btn-primary">View Recipe</Link>
            <button
              className="btn btn-warning ms-2"
              onClick={handleBookmark}
            >
              {isBookmarked ? <FaBookmark /> : <FaRegBookmark />}
            </button>
            <Link to={`/edit-recipe/${recipe._id}`} className="btn btn-secondary ms-2">
              <FaEdit />
            </Link>
            <button className="btn btn-danger ms-2" onClick={()=>handleDelete(recipe._id)}>
              <FaTrash />
            </button>
          </div>
        </div>
      </div>
    );
  };

export default RecipeCard;
