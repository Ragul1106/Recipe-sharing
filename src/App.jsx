import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Recipes from './pages/Recipes';
import RecipeDetailPage from './pages/RecipeDetailPage';
import AddRecipe from './pages/AddRecipe';
import Navbar from './components/Navbar';

export default function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recipes" element={<Recipes />} />
        <Route path="/recipes/:id" element={<RecipeDetailPage />} />
        <Route path="/add" element={<AddRecipe />} />
      </Routes>
    </Router>
  );
}
