import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import API from '../api';

export default function RecipeDetailPage() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    API.get(`/lookup.php?i=${id}`).then((res) => {
      setRecipe(res.data.meals?.[0]);
    });
  }, [id]);

  if (!recipe) return <p style={{ textAlign: 'center', marginTop: '2rem', fontSize: '1.2rem' }}>Loading...</p>;

  return (
    <div
      style={{
        maxWidth: '900px',
        margin: '2rem auto',
        padding: '2rem',
        borderRadius: '12px',
        background: '#f9f9ff',
        boxShadow: '0 0 20px rgba(0, 0, 0, 0.1)',
        color: '#333',
        fontFamily: 'Arial, sans-serif'
      }}
    >
      <h2
        style={{
          fontSize: '2.5rem',
          color: '#ff4c60',
          textAlign: 'center',
          marginBottom: '1.5rem'
        }}
      >
        {recipe.strMeal}
      </h2>
      <img
        src={recipe.strMealThumb}
        alt={recipe.strMeal}
        style={{
          width: '100%',
          maxHeight: '400px',
          objectFit: 'cover',
          borderRadius: '10px',
          marginBottom: '1.5rem',
          border: '3px solid #ff4c60'
        }}
      />
      <p style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>
        <strong style={{ color: '#007bff' }}>Category:</strong> {recipe.strCategory}
      </p>
      <p style={{ fontSize: '1.1rem', lineHeight: '1.7' }}>
        <strong style={{ color: '#28a745' }}>Instructions:</strong><br />
        {recipe.strInstructions}
      </p>
    </div>
  );
}
