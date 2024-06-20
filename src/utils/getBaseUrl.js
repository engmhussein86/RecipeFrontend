const getBaseUrl = () => {
    if (window.location.hostname === 'localhost') {
      return 'http://localhost:4000';
    } else {
      return 'https://recipebackend-lx5k.onrender.com';
    }
  };
  
  export default getBaseUrl;
  