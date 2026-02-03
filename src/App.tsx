import React, { useState } from "react";

export const App = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6">
      <h1 className="text-2xl font-bold">TEST ADMIN</h1>

      <button
        onClick={() => {
          alert("CLICK FUNCIONA");
          setOpen(true);
        }}
        className="px-6 py-3 bg-black text-white rounded"
      >
        Abrir Admin
      </button>

      {open && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center">
          <div className="bg-white p-10 rounded text-center">
            <h2 className="text-xl font-bold text-green-600">
              ADMIN ABIERTO
            </h2>

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
