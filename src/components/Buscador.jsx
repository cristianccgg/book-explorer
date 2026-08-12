import React from "react";

const Buscador = ({ buscarLibro, busquedaInput, setBusquedaInput }) => {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        buscarLibro();
      }}
      className="mx-auto mb-10 flex max-w-xl gap-3"
    >
      <input
        value={busquedaInput}
        onChange={(e) => setBusquedaInput(e.target.value)}
        type="text"
        placeholder="Busca un libro..."
        className="flex-1 rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-800 shadow-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
      />
      <button
        type="submit"
        className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white shadow-sm transition hover:bg-blue-700"
      >
        Buscar
      </button>
    </form>
  );
};

export default Buscador;
