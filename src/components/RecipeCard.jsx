import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function RecipeCard({ meal }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/recipes/${meal.idMeal}`);
  };

  return (
    <div
      className="card h-100 shadow-sm"
      onClick={handleClick}
      style={{
        cursor: 'pointer',
        borderRadius: '12px',
        overflow: 'hidden',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'scale(1.02)';
        e.currentTarget.style.boxShadow = '0 6px 16px rgba(0, 0, 0, 0.15)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'scale(1)';
        e.currentTarget.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
      }}
    >
      <img
        src={meal.strMealThumb}
        className="card-img-top"
        alt={meal.strMeal}
        style={{
          height: '200px',
          objectFit: 'cover',
          borderTopLeftRadius: '12px',
          borderTopRightRadius: '12px',
        }}
      />
      <div
        className="card-body"
        style={{ padding: '16px', backgroundColor: '#f8f9fa' }}
      >
        <h5 className="card-title" style={{ fontWeight: '600', color: '#343a40' }}>
          {meal.strMeal}
        </h5>
        <p className="card-text" style={{ margin: '8px 0', color: '#6c757d' }}>
          <strong>Category:</strong> {meal.strCategory || 'N/A'}
        </p>
        <p className="card-text text-muted" style={{ fontSize: '0.9rem', marginBottom: 0 }}>
          Click to view full recipe
        </p>
      </div>
    </div>
  );
}
