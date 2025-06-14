import React, { useState, useEffect } from 'react';
import withValidation from '../hoc/withValidation';
import ImageUploadModal from '../components/ImageUploadModal';

function AddRecipe({ isValid }) {
  const [form, setForm] = useState({
    title: '',
    category: '',
    instructions: '',
    image: null,
  });
  const [customRecipes, setCustomRecipes] = useState([]);
  const [showUploader, setShowUploader] = useState(false);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('customRecipes')) || [];
    setCustomRecipes(saved);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isValid(form)) {
      alert('All fields are required!');
      return;
    }

    const newRecipe = {
      id: Date.now(),
      ...form,
    };

    const updatedRecipes = [newRecipe, ...customRecipes];
    setCustomRecipes(updatedRecipes);
    localStorage.setItem('customRecipes', JSON.stringify(updatedRecipes));

    setForm({
      title: '',
      category: '',
      instructions: '',
      image: null,
    });
  };

  const handleImageSelect = (file) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setForm((prev) => ({ ...prev, image: reader.result }));
      setShowUploader(false);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div
      className="container mt-4"
      style={{
        background: '#fff9fb',
        padding: '2rem',
        borderRadius: '12px',
        boxShadow: '0 10px 25px rgba(0,0,0,0.08)',
        fontFamily: 'Segoe UI, sans-serif',
      }}
    >
      <h2 style={{ color: '#e83e8c', marginBottom: '1.5rem' }}>Add a New Recipe</h2>

      <form onSubmit={handleSubmit} className="mb-4">
        <input
          className="form-control mb-3"
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          style={{ padding: '0.75rem', borderRadius: '8px' }}
        />
        <input
          className="form-control mb-3"
          placeholder="Category"
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
          style={{ padding: '0.75rem', borderRadius: '8px' }}
        />
        <textarea
          className="form-control mb-3"
          placeholder="Instructions"
          rows={4}
          value={form.instructions}
          onChange={(e) => setForm({ ...form, instructions: e.target.value })}
          style={{ padding: '0.75rem', borderRadius: '8px' }}
        />

        <div className="mb-4">
          <button
            type="button"
            className="btn btn-outline-secondary"
            onClick={() => setShowUploader(true)}
            style={{
              padding: '0.6rem 1.2rem',
              borderRadius: '8px',
              fontWeight: '500',
              color: '#6c757d',
            }}
          >
            {form.image ? 'Change Image' : 'Upload Image'}
          </button>

          {form.image && (
            <div className="mt-3">
              <img
                src={form.image}
                alt="Recipe"
                style={{
                  maxWidth: '100%',
                  maxHeight: 200,
                  borderRadius: '10px',
                  border: '1px solid #eee',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                }}
              />
            </div>
          )}
        </div>

        <button
          type="submit"
          className="btn btn-primary"
          style={{
            backgroundColor: '#e83e8c',
            borderColor: '#e83e8c',
            padding: '0.6rem 1.4rem',
            fontWeight: 'bold',
            borderRadius: '8px',
          }}
        >
          Submit
        </button>
      </form>

      <h4 style={{ color: '#343a40' }}>Custom Recipes You've Added:</h4>
      {customRecipes.length === 0 ? (
        <p style={{ color: '#6c757d' }}>No custom recipes added yet.</p>
      ) : (
        <div className="row">
          {customRecipes.map((recipe) => (
            <div key={recipe.id} className="col-md-4 mb-4">
              <div
                className="card h-100"
                style={{
                  border: '1px solid #eee',
                  borderRadius: '12px',
                  boxShadow: '0 4px 10px rgba(0,0,0,0.05)',
                  overflow: 'hidden',
                }}
              >
                {recipe.image && (
                  <img
                    src={recipe.image}
                    alt={recipe.title}
                    className="card-img-top"
                    style={{
                      height: 180,
                      objectFit: 'cover',
                      borderBottom: '1px solid #ddd',
                    }}
                  />
                )}
                <div className="card-body">
                  <h5 className="card-title">{recipe.title}</h5>
                  <p>
                    <strong>Category:</strong> {recipe.category}
                  </p>
                  <p style={{ fontSize: '0.9rem' }}>{recipe.instructions}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <ImageUploadModal
        show={showUploader}
        onClose={() => setShowUploader(false)}
        onImageSelect={handleImageSelect}
      />
    </div>
  );
}

export default withValidation(AddRecipe);
