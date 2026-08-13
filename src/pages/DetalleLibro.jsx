import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const DetalleLibro = ({
  onActualizar,
  misLibros,
  onAgregar,
  onEditarNota,
  onEliminarNota,
}) => {
  const [libroDetalle, setLibroDetalle] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const { key } = useParams();
  const [abrirEditorProgreso, setAbrirEditorProgreso] = useState(false);
  const [abrirCrearNotas, setAbrirCrearNotas] = useState(false);
  const [abrirEditorNota, setAbrirEditorNota] = useState(false);
  const [totalPaginasInput, setTotalPaginasInput] = useState("");
  const [paginaActualInput, setPaginaActualInput] = useState("");
  const [tituloNota, setTituloNota] = useState("");
  const [descripcionNota, setDescripcionNota] = useState("");
  const libroSeleccionado = misLibros.find((libro) => libro.key === key);
  const [notaSeleccionada, setNotaSeleccionada] = useState(null);

  useEffect(() => {
    const obtenerLibroDetalle = async () => {
      try {
        setLoading(true);
        setError(false);
        const response = await fetch(
          `https://openlibrary.org/works/${key}.json`,
        );
        const data = await response.json();
        setLibroDetalle(data);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    obtenerLibroDetalle();
  }, [key]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-100 px-6 py-10">
        <div className="mx-auto flex min-h-[70vh] max-w-6xl items-center justify-center">
          <p className="text-xl font-semibold text-slate-700">
            Cargando libro...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-100 px-6 py-10">
        <div className="mx-auto flex min-h-[70vh] max-w-6xl items-center justify-center">
          <p className="rounded-lg bg-red-50 px-6 py-4 text-xl font-semibold text-red-700">
            No se pudieron cargar los detalles del libro
          </p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-slate-100 px-6 py-10">
      <div className="mx-auto max-w-6xl">
        <div className="overflow-hidden rounded-2xl bg-white shadow-lg">
          <div className="grid md:grid-cols-[280px_1fr]">
            {libroDetalle.covers.length > 0 ? (
              <img
                src={`https://covers.openlibrary.org/b/id/${libroDetalle.covers[0]}-M.jpg`}
                alt={libroDetalle.title}
                className="h-96 w-full object-cover md:h-full"
              />
            ) : (
              <div className="flex h-96 items-center justify-center bg-slate-200 px-4 text-center text-sm text-slate-500 md:h-full">
                Imagen no encontrada
              </div>
            )}

            <div className="p-6 md:p-10">
              <h1 className="text-3xl font-bold text-slate-800 md:text-4xl">
                {libroDetalle.title}
              </h1>

              <div className="mt-6">
                <h2 className="mb-2 text-lg font-semibold text-slate-700">
                  Descripción
                </h2>
                {libroDetalle.description ? (
                  <p className="leading-7 text-slate-600">
                    {libroDetalle.description.value}
                  </p>
                ) : (
                  <p>Descripcion no disponible</p>
                )}
              </div>

              {!abrirEditorProgreso &&
                (libroSeleccionado?.totalPaginas ? (
                  <div className="mt-6 rounded-xl bg-slate-50 p-5">
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-slate-500">
                        Páginas totales
                      </p>
                      <p className="text-2xl font-bold text-slate-800">
                        {libroSeleccionado.totalPaginas}
                      </p>

                      <p className="mt-4 text-sm font-medium text-slate-500">
                        Página actual
                      </p>
                      <p className="text-2xl font-bold text-slate-800">
                        {libroSeleccionado.paginaActual}
                      </p>
                    </div>

                    <button
                      onClick={() => {
                        setTotalPaginasInput(libroSeleccionado.totalPaginas);
                        setPaginaActualInput(libroSeleccionado.paginaActual);
                        setAbrirEditorProgreso(true);
                      }}
                      className="mt-5 rounded-lg bg-slate-800 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-700"
                    >
                      Editar progreso
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setAbrirEditorProgreso(true)}
                    className="mt-6 rounded-lg bg-slate-800 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-700"
                  >
                    Agregar progreso
                  </button>
                ))}

              {abrirEditorProgreso && (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    onActualizar(key, totalPaginasInput, paginaActualInput);
                    setAbrirEditorProgreso(false);
                  }}
                  className="mt-6 max-w-sm rounded-xl bg-slate-50 p-5"
                >
                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="totalPaginas"
                      className="text-sm font-semibold text-slate-700"
                    >
                      Total páginas
                    </label>

                    <input
                      value={totalPaginasInput}
                      onChange={(e) => setTotalPaginasInput(e.target.value)}
                      id="totalPaginas"
                      type="number"
                      className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-800 outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
                    />
                  </div>

                  <div className="mt-4 flex flex-col gap-2">
                    <label
                      htmlFor="paginaActual"
                      className="text-sm font-semibold text-slate-700"
                    >
                      Página actual
                    </label>

                    <input
                      value={paginaActualInput}
                      onChange={(e) => setPaginaActualInput(e.target.value)}
                      id="paginaActual"
                      type="number"
                      className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-800 outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
                    />
                  </div>

                  <div className="mt-5 flex gap-3">
                    <button
                      type="button"
                      onClick={() => setAbrirEditorProgreso(false)}
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
              )}

              {libroSeleccionado?.notas && (
                <div>
                  {libroSeleccionado.notas.map((nota) => (
                    <div
                      key={nota.id}
                      className="space-y-2 mt-6 rounded-xl bg-slate-50 p-5"
                    >
                      <p className="mt-4 text-sm font-medium text-slate-500">
                        Fecha
                      </p>
                      <p className="text-2xl font-bold text-slate-800">
                        {new Date(nota.fecha).toLocaleDateString("es-CO")}
                      </p>
                      <p className="text-sm font-medium text-slate-500">
                        Titulo Nota
                      </p>
                      <p className="text-2xl font-bold text-slate-800">
                        {nota.titulo}
                      </p>
                      <p className="mt-4 text-sm font-medium text-slate-500">
                        Descripcion
                      </p>
                      <p className="text-2xl font-bold text-slate-800">
                        {nota.descripcion}
                      </p>

                      <button
                        onClick={() => {
                          setNotaSeleccionada(nota.id);
                          setTituloNota(nota.titulo);
                          setDescripcionNota(nota.descripcion);
                          setAbrirEditorNota(true);
                        }}
                        className="mt-5 mr-5 rounded-lg bg-slate-800 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-700"
                      >
                        Editar Nota
                      </button>

                      <button
                        onClick={() => {
                          onEliminarNota(key, nota.id);
                        }}
                        className="mt-5 rounded-lg bg-slate-800 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-700"
                      >
                        Eliminar Nota
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {abrirEditorNota && (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    onEditarNota(
                      key,
                      notaSeleccionada,
                      tituloNota,
                      descripcionNota,
                    );
                    setAbrirEditorNota(false);
                    setTituloNota("");
                    setDescripcionNota("");
                  }}
                  className="mt-6  rounded-xl bg-slate-50 p-5"
                >
                  <h2>Editando Nota</h2>
                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="tituloNota"
                      className="text-sm font-semibold text-slate-700"
                    >
                      Titulo Nota
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
                      name="descripcionNota"
                      id="descripcionNota"
                    ></textarea>
                  </div>

                  <div className="mt-5 flex gap-3">
                    <button
                      type="button"
                      onClick={() => setAbrirEditorNota(false)}
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
              )}

              {!abrirCrearNotas && (
                <button
                  onClick={() => setAbrirCrearNotas(true)}
                  className="mt-6 rounded-lg bg-slate-800 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-700"
                >
                  Agregar Notas
                </button>
              )}

              {abrirCrearNotas && (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    onAgregar(key, tituloNota, descripcionNota);
                    setTituloNota("");
                    setDescripcionNota("");
                    setAbrirCrearNotas(false);
                  }}
                  className="mt-6  rounded-xl bg-slate-50 p-5"
                >
                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="tituloNota"
                      className="text-sm font-semibold text-slate-700"
                    >
                      Titulo Nota
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
                      name="descripcionNota"
                      id="descripcionNota"
                      className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-800 outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
                    ></textarea>
                  </div>

                  <div className="mt-5 flex gap-3">
                    <button
                      type="button"
                      onClick={() => setAbrirCrearNotas(false)}
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
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default DetalleLibro;
