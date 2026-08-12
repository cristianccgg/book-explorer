const ResultadosBusqueda = ({
  loading,
  error,
  libros,
  buscando,
  misLibros,
  onAgregar,
}) => {
  return (
    <section>
      <h2 className="my-6 text-2xl font-bold text-slate-800">
        Resultados de búsqueda
      </h2>
      {loading && (
        <div className="rounded-lg bg-white p-6 text-center text-slate-600 shadow-sm">
          Cargando libros...
        </div>
      )}
      {error && (
        <div className="rounded-lg bg-red-50 p-6 text-center text-red-700">
          No se pudieron cargar los libros.
        </div>
      )}
      {libros.length === 0 && !buscando && (
        <p className="text-center text-slate-500">
          Realiza una búsqueda de libros para comenzar.
        </p>
      )}
      {libros.length === 0 && buscando && !loading && (
        <p className="text-center text-slate-500">
          No hay resultados para tu búsqueda.
        </p>
      )}
      <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {libros.map((libro) => {
          const existe = misLibros.some(
            (libroGuardado) => libroGuardado.key === libro.key,
          );
          return (
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
                onClick={() => onAgregar(libro)}
                type="button"
                disabled={existe}
                className={`m-3 rounded-lg px-2 py-2 text-sm font-semibold text-white transition active:scale-95 ${
                  existe
                    ? "bg-gray-600 hover:bg-gray-700"
                    : "bg-blue-600 hover:bg-blue-700"
                }`}
              >
                {existe ? "Ya está en mis libros" : "Agregar a mis libros"}
              </button>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default ResultadosBusqueda;
