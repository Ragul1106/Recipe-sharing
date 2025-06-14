import { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import bootstrap from 'bootstrap/dist/js/bootstrap.bundle.min.js';

export default function Navbar() {
  useEffect(() => {
    const tooltipTriggerList = [].slice.call(
      document.querySelectorAll('[data-bs-toggle="tooltip"]')
    );
    tooltipTriggerList.map((el) => new bootstrap.Tooltip(el));
  }, []);

  const linkStyle = {
    color: '#f8f9fa',
    padding: '10px 18px',
    textDecoration: 'none',
    borderRadius: '8px',
    fontWeight: 600,
    transition: 'background-color 0.3s, color 0.3s',
  };

  const activeStyle = {
    backgroundColor: 'lightcoral', 
    color: '#212529',
  };

  return (
    <nav
      className="navbar navbar-expand-lg"
      style={{
        background: 'linear-gradient(90deg, #006400, #228B22)', 
        padding: '14px 0',
      }}
    >
      <div className="container d-flex justify-content-between align-items-center">
        <NavLink
          to="/"
          title="Go to Home page"
          data-bs-toggle="tooltip"
          data-bs-placement="top"
          className="navbar-brand"
          style={{
            fontSize: '1.6rem',
            fontWeight: 'bold',
            color: '#f1f1f1',
            textShadow: '1px 1px 3px rgba(0,0,0,0.2)',
          }}
        >
          RecipeApp
        </NavLink>

        <div className="d-flex gap-3">
          {['/', '/recipes', '/add'].map((path, i) => {
            const labels = ['Home', 'Recipes', 'Add Recipe'];
            return (
              <NavLink
                key={path}
                to={path}
                title={`Go to ${labels[i]} page`}
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                style={({ isActive }) =>
                  isActive
                    ? { ...linkStyle, ...activeStyle }
                    : linkStyle
                }
                className="nav-link-custom"
              >
                {labels[i]}
              </NavLink>
            );
          })}
        </div>
      </div>

      <style>{`
        .nav-link-custom:hover {
          background-color: rgba(255, 255, 255, 0.2);
          color: #fff !important;
        }
      `}</style>
    </nav>
  );
}
