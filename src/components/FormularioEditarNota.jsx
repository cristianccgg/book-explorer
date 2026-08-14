const FormularioEditarNota = ({
  nota,
  onEditarNota,
  libroKey,
  notaSeleccionada,
  tituloNota,
  descripcionNota,
  setNotaSeleccionada,
  setTituloNota,
  setDescripcionNota,
}) => {
  return (
    <form
      key={nota.id}
      onSubmit={(e) => {
        e.preventDefault();
        onEditarNota(libroKey, notaSeleccionada, tituloNota, descripcionNota);
        setNotaSeleccionada(null);
        setTituloNota("");
        setDescripcionNota("");
      }}
      className="mt-6 rounded-xl bg-slate-50 p-5"
    >
      <h2 className="mb-5 text-xl font-bold text-slate-800">Editando Nota</h2>

      <div className="flex flex-col gap-2">
        <label
          htmlFor="tituloNota"
          className="text-sm font-semibold text-slate-700"
        >
          Título Nota
        </label>

        <input
          value={tituloNota}
          onChange={(e) => setTituloNota(e.target.value)}
          id="tituloNota"
          type="text"
          className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-800 outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
        />
      </div>

      <div className="mt-4 flex flex-col gap-2">
        <label
          htmlFor="descripcionNota"
          className="text-sm font-semibold text-slate-700"
        >
          Nota
        </label>

        <textarea
          value={descripcionNota}
          onChange={(e) => setDescripcionNota(e.target.value)}
          id="descripcionNota"
          className="min-h-32 rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-800 outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
        />
      </div>

      <div className="mt-5 flex gap-3">
        <button
          type="button"
          onClick={() => {
            setNotaSeleccionada(null);
            setTituloNota("");
            setDescripcionNota("");
          }}
          className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-100"
        >
          Cancelar
        </button>

        <button
          type="submit"
          className="rounded-lg bg-slate-800 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-700"
        >
          Guardar
        </button>
      </div>
    </form>
  );
};

export default FormularioEditarNota;
