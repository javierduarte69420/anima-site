import React, { useState } from "react";

const ADMIN_PASSWORD = "Xk9#mP2$vL8@qR5!nW7^tY4&jH6*bN3";

export const App = () => {
  const [value, setValue] = useState("");
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");

  const handleVerify = () => {
    if (value === ADMIN_PASSWORD) {
      setOpen(true);
      setError("");
    } else {
      setError("Contraseña incorrecta");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4">
      <h1 className="text-2xl font-bold">LOGIN ADMIN (TEST)</h1>

      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Folio fiscal"
        className="border px-4 py-2 w-80"
      />

      <button
        onClick={handleVerify}
        className="px-6 py-2 bg-black text-white rounded"
      >
        Verificar CFDI
      </button>

      {error && <p className="text-red-600">{error}</p>}

      {open && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center">
          <div className="bg-white p-10 rounded text-center">
            <h2 className="text-xl font-bold text-green-600">
              ADMIN PANEL ABIERTO
            </h2>

            <p className="mt-2 text-gray-600">
              La contraseña funciona correctamente.
            </p>

            <button
              onClick={() => setOpen(false)}
              className="mt-6 px-6 py-2 bg-red-600 text-white rounded"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
