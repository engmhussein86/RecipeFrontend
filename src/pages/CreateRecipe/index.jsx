import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

export default function CreateRecipe(){
    const params = useParams();
    console.log(params);


      const [title, setTitle] = useState('');
      const [imageUrl, setImageUrl] = useState('');
      const [ingredients, setIngredients] = useState('');
      const [instructions, setInstructions] = useState('');
    
      const token = localStorage.getItem('token');
    
      useEffect(() => {
        // Fetch existing recipe data if editing
        const fetchRecipe = async () => {
          if (params.id) {
            try {
              const res = await axios.get(`http://localhost:4000/recipes/${params.id}`);
              const { title, imageUrl, description, ingredients, instructions } = res.data;
              setTitle(title);
              setImageUrl(imageUrl);
              setIngredients(ingredients.join('\n'));
              setInstructions(instructions);
            } catch (err) {
              console.error('Error fetching recipe', err);
            }
          }
        };
    
        fetchRecipe();
      }, [params.id]);
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const recipeData = {
            title,
            imageUrl,
            ingredients: ingredients.split('\n').map(item => item.trim()),
            instructions,
          };
    
          if (params.id) {
            // Update existing recipe
            await axios.put(`http://localhost:4000/recipes/${params.id}`, recipeData, {
              headers: { 'x-auth-token': token },
            });
          } else {
            // Add new recipe
            await axios.post('http://localhost:4000/recipes', recipeData, {
              headers: { 'x-auth-token': token },
            });
          }
    
          // Redirect or display success message
          alert('Recipe saved successfully!');
          // Redirect to recipe list or recipe details page
        } catch (err) {
          console.error('Error saving recipe', err);
          alert('Failed to save recipe. Please try again.');
        }
      };
    
      return (
        <div className="container mt-5">
          <h2>{params.id ? 'Edit Recipe' : 'Add Recipe'}</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="title" className="form-label">Title</label>
              <input type="text" className="form-control" id="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
            </div>
            <div className="mb-3">
              <label htmlFor="imageUrl" className="form-label">Image URL</label>
              <input type="text" className="form-control" id="imageUrl" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)}  />
            </div>
            
            <div className="mb-3">
              <label htmlFor="ingredients" className="form-label">Ingredients</label>
              <textarea className="form-control" id="ingredients" rows="5" value={ingredients} onChange={(e) => setIngredients(e.target.value)} required />
            </div>
            <div className="mb-3">
              <label htmlFor="instructions" className="form-label">Instructions</label>
              <textarea className="form-control" id="instructions" rows="5" value={instructions} onChange={(e) => setInstructions(e.target.value)} required />
            </div>
            <button type="submit" className="btn btn-primary">Save Recipe</button>
          </form>
        </div>
      );
    };
    
   
    