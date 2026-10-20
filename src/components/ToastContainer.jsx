import React from 'react';

export default function ToastContainer({ toasts = [] }) {
  if (toasts.length === 0) return null;

  return (
    <div className="toast-container">
      {toasts.map((toast) => (
        <div key={toast.id} className={`toast-item ${toast.type}`}>
          <span style={{ fontSize: '1.25rem' }}>{toast.icon || '✨'}</span>
          <span>{toast.message}</span>
        </div>
      ))}
    </div>
  );
}
