import React, { useEffect, useState } from 'react';
import API from '../api';
import RecipeCard from '../components/RecipeCard';

export default function Recipes() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchLetter, setSearchLetter] = useState('b');

  useEffect(() => {
    if (!searchLetter) {
      setRecipes([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    API.get(`/search.php?f=${searchLetter}`)
      .then((res) => {
        const data = res.data.meals;
        setRecipes(data ? data : []);
        setLoading(false);
      })
      .catch(() => {
        setRecipes([]);
        setLoading(false);
      });
  }, [searchLetter]);

  return (
    <div
      style={{
        maxWidth: '1100px',
        margin: '2rem auto',
        padding: '2rem',
        background: '#fff9fc',
        borderRadius: '12px',
        boxShadow: '0 8px 20px rgba(0, 0, 0, 0.08)',
        fontFamily: 'Segoe UI, sans-serif',
      }}
    >
      <h2 style={{ color: '#e83e8c', marginBottom: '1.5rem' }}>Browse Recipes</h2>

      <div style={{ marginBottom: '1.5rem' }}>
        <label
          htmlFor="searchInput"
          style={{ display: 'block', fontWeight: '600', marginBottom: '0.5rem' }}
        >
          Search by first letter:
        </label>
        <input
          id="searchInput"
          type="text"
          maxLength={1}
          value={searchLetter}
          onChange={(e) => {
            const val = e.target.value.toLowerCase();
            if (/^[a-z]?$/.test(val)) {
              setSearchLetter(val);
            }
          }}
          style={{
            width: '120px',
            padding: '0.5rem 1rem',
            borderRadius: '8px',
            border: '1px solid #ccc',
            outline: 'none',
            fontSize: '1rem',
          }}
          placeholder="a-z"
        />
      </div>

      {loading ? (
        <p style={{ fontSize: '1.1rem', color: '#888' }}>Loading recipes...</p>
      ) : recipes.length === 0 ? (
        <p style={{ fontSize: '1.1rem', color: '#dc3545' }}>
          No recipes found for "{searchLetter}".
        </p>
      ) : (
        <div className="row">
          {recipes.map((meal) => (
            <div className="col-md-4 mb-4" key={meal.idMeal}>
              <RecipeCard meal={meal} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
