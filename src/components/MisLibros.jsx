const MisLibros = ({ misLibros, onEliminar }) => {
  return (
    <section>
      <h2 className="mb-6 text-2xl font-bold text-slate-800">
        Mis libros guardados
      </h2>
      <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {misLibros.map((libro) => (
          <div
            key={libro.key}
            className="overflow-hidden flex flex-col rounded-xl bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
          >
            {libro.cover_i ? (
              <img
                src={`https://covers.openlibrary.org/b/id/${libro.cover_i}-M.jpg`}
                alt={libro.title}
                className="h-72 w-full object-cover"
              />
            ) : (
              <div className="flex h-72 items-center justify-center bg-slate-200 px-4 text-center text-sm text-slate-500">
                Imagen no encontrada
              </div>
            )}
            <div className="p-4 flex-1">
              <p className="font-semibold text-slate-800">{libro.title}</p>
              <p className="mt-1 text-sm text-slate-500">
                {libro.author_name?.join(", ")}
              </p>
            </div>
            <button
              onClick={() => onEliminar(libro.key)}
              type="button"
              className="m-3 rounded-lg bg-blue-600 px-2 py-2 text-sm font-semibold text-white transition hover:bg-blue-700 active:scale-95"
            >
              Eliminar de mis libros
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MisLibros;
