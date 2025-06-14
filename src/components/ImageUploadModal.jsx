import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const modalRoot = document.getElementById('modal-root'); 

export default function ImageUploadModal({ show, onClose, onImageSelect }) {
  const [preview, setPreview] = useState(null);

  if (!show) return null;

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreview(url);
      onImageSelect(file);
    }
  };

  return ReactDOM.createPortal(
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0,0,0,0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
      }}
      onClick={onClose}
    >
      <div
        style={{ background: 'white', padding: 20, borderRadius: 8, maxWidth: 400, position: 'relative' }}
        onClick={(e) => e.stopPropagation()}
      >
        <h3>Upload Image</h3>
        <input type="file" accept="image/*" onChange={handleFileChange} />
        {preview && (
          <img
            src={preview}
            alt="Preview"
            style={{ marginTop: 10, maxWidth: '100%', maxHeight: 200, borderRadius: 8 }}
          />
        )}
        <button className="btn btn-secondary mt-3" onClick={onClose}>
          Close
        </button>
      </div>
    </div>,
    modalRoot
  );
}
