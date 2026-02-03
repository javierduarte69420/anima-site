import React, { useState } from 'react';

export type AdminLoginProps = {
  onLogin: () => void;
};

export const AdminLogin = (props: AdminLoginProps) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password === 'Xk9#mP2$vL8@qR5!nW7^tY4&jH6*bN3') {
      props.onLogin();
      setError('');
    } else {
      setError('Contraseña incorrecta');
      setPassword('');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full">
        <h2 className="text-2xl font-semibold text-neutral-700 mb-6">
          Panel de Administración
        </h2>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-semibold text-neutral-600 mb-2">
              Contraseña de Administrador
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-neutral-300 rounded focus:outline-none focus:ring-2 focus:ring-pink-950"
              placeholder="Ingrese la contraseña"
              autoFocus
            />
          </div>
          
          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded text-sm">
              {error}
            </div>
          )}
          
          <div className="flex gap-3">
            <button
              type="submit"
              className="flex-1 bg-pink-950 text-white px-6 py-2.5 rounded hover:opacity-80"
            >
              Ingresar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
