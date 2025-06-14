import React, { useEffect, useState } from 'react';
import API from '../api';
import RecipeCard from '../components/RecipeCard';

export default function Home() {
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    API.get('/search.php?f=a') 
      .then((res) => setMeals(res.data.meals || []));
  }, []);

  return (
    <div className="container mt-4">
      <h2>Featured Recipes</h2>
      <div className="row">
        {meals.map((meal) => (
          <div className="col-md-4 mb-3" key={meal.idMeal}>
            <RecipeCard meal={meal} />
          </div>
        ))}
      </div>
    </div>
  );
}
