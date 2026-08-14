import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Nota from "../components/Nota";
import FormularioNota from "../components/FormularioNota";
import FormularioEditarNota from "../components/FormularioEditarNota";

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

  const progreso =
    libroSeleccionado.paginaActual / libroSeleccionado.totalPaginas;

  const porcentaje = (progreso * 100).toFixed(2);

  const paginasRestantes =
    libroSeleccionado.totalPaginas - libroSeleccionado.paginaActual;

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
    <main className="min-h-screen bg-slate-100 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <Link
          to="/"
          className="mb-5 inline-flex items-center gap-2 text-sm font-semibold text-slate-600 transition hover:text-slate-900"
        >
          ← Volver a mis libros
        </Link>
        <div className="overflow-hidden rounded-2xl bg-white shadow-lg">
          <div className="grid md:grid-cols-[280px_1fr]">
            {/* PORTADA */}
            <div className="bg-slate-200">
              {libroDetalle.covers.length > 0 ? (
                <img
                  src={`https://covers.openlibrary.org/b/id/${libroDetalle.covers[0]}-M.jpg`}
                  alt={libroDetalle.title}
                  className="h-96 w-full object-cover md:h-full"
                />
              ) : (
                <div className="flex h-96 items-center justify-center px-4 text-center text-sm text-slate-500 md:h-full">
                  Imagen no encontrada
                </div>
              )}
            </div>

            {/* CONTENIDO */}
            <div className="p-6 sm:p-8 lg:p-10">
              {/* INFORMACIÓN DEL LIBRO */}
              <div>
                <h1 className="text-3xl font-bold tracking-tight text-slate-800 md:text-4xl">
                  {libroDetalle.title}
                </h1>

                <div className="mt-8">
                  <h2 className="mb-3 text-lg font-semibold text-slate-800">
                    Descripción
                  </h2>

                  {libroDetalle.description ? (
                    <p className="leading-7 text-slate-600">
                      {libroDetalle.description.value}
                    </p>
                  ) : (
                    <p className="text-sm text-slate-500">
                      Descripción no disponible
                    </p>
                  )}
                </div>
              </div>

              {/* PROGRESO DE LECTURA */}
              {!abrirEditorProgreso &&
                (libroSeleccionado?.totalPaginas ? (
                  <section className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-5 sm:p-6">
                    <div className="flex items-center justify-between">
                      <h2 className="text-lg font-semibold text-slate-800">
                        Progreso de lectura
                      </h2>

                      <span className="text-sm font-bold text-slate-600">
                        {porcentaje}%
                      </span>
                    </div>

                    <div className="mt-5">
                      <div className="flex items-end justify-between gap-4">
                        <div>
                          <p className="text-sm font-medium text-slate-500">
                            Página actual
                          </p>
                          <p className="mt-1 text-2xl font-bold text-slate-800">
                            {libroSeleccionado.paginaActual}
                          </p>
                        </div>

                        <div className="text-right">
                          <p className="text-sm font-medium text-slate-500">
                            Páginas totales
                          </p>
                          <p className="mt-1 text-2xl font-bold text-slate-800">
                            {libroSeleccionado.totalPaginas}
                          </p>
                        </div>
                      </div>

                      <div className="mt-5 h-3 w-full overflow-hidden rounded-full bg-slate-200">
                        <div
                          style={{ width: `${porcentaje}%` }}
                          className="h-full rounded-full bg-green-500 transition-all"
                        ></div>
                      </div>

                      <p className="mt-3 text-sm text-slate-500">
                        {paginasRestantes} páginas restantes
                      </p>
                    </div>

                    <button
                      onClick={() => {
                        setTotalPaginasInput(libroSeleccionado.totalPaginas);
                        setPaginaActualInput(libroSeleccionado.paginaActual);
                        setAbrirEditorProgreso(true);
                      }}
                      className="mt-6 rounded-lg bg-slate-800 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-700"
                    >
                      Editar progreso
                    </button>
                  </section>
                ) : (
                  <button
                    onClick={() => setAbrirEditorProgreso(true)}
                    className="mt-8 rounded-lg bg-slate-800 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-700"
                  >
                    Agregar progreso
                  </button>
                ))}

              {/* FORMULARIO DE PROGRESO */}
              {abrirEditorProgreso && (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    onActualizar(key, totalPaginasInput, paginaActualInput);
                    setAbrirEditorProgreso(false);
                  }}
                  className="mt-8 max-w-md rounded-2xl border border-slate-200 bg-slate-50 p-5 sm:p-6"
                >
                  <h2 className="mb-5 text-lg font-semibold text-slate-800">
                    Actualizar progreso
                  </h2>

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
                      className="rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-slate-800 outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
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
                      className="rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-slate-800 outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
                    />
                  </div>

                  <div className="mt-6 flex gap-3">
                    <button
                      type="button"
                      onClick={() => setAbrirEditorProgreso(false)}
                      className="rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-100"
                    >
                      Cancelar
                    </button>

                    <button
                      type="submit"
                      className="rounded-lg bg-slate-800 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-700"
                    >
                      Guardar
                    </button>
                  </div>
                </form>
              )}

              {/* NOTAS */}
              {libroSeleccionado?.notas && (
                <section className="mt-10 border-t border-slate-200 pt-8">
                  <div className="mb-5">
                    <h2 className="text-2xl font-bold text-slate-800">
                      Notas de lectura
                    </h2>
                    <p className="mt-1 text-sm text-slate-500">
                      Tus apuntes y reflexiones sobre este libro.
                    </p>
                  </div>

                  <div className="max-h-[500px] space-y-4 overflow-y-auto pr-2">
                    {libroSeleccionado.notas.map((nota) =>
                      notaSeleccionada === nota.id ? (
                        <FormularioEditarNota
                          nota={nota}
                          onEditarNota={onEditarNota}
                          libroKey={key}
                          notaSeleccionada={notaSeleccionada}
                          tituloNota={tituloNota}
                          descripcionNota={descripcionNota}
                          setNotaSeleccionada={setNotaSeleccionada}
                          setTituloNota={setTituloNota}
                          setDescripcionNota={setDescripcionNota}
                        />
                      ) : (
                        <Nota
                          key={nota.id}
                          nota={nota}
                          libroKey={key}
                          onEditar={(nota) => {
                            setNotaSeleccionada(nota.id);
                            setTituloNota(nota.titulo);
                            setDescripcionNota(nota.descripcion);
                          }}
                          onEliminarNota={onEliminarNota}
                        />
                      ),
                    )}
                  </div>

                  {!abrirCrearNotas && (
                    <button
                      onClick={() => setAbrirCrearNotas(true)}
                      className="mt-6 rounded-lg bg-slate-800 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-700"
                    >
                      Agregar nota
                    </button>
                  )}

                  {abrirCrearNotas && (
                    <FormularioNota
                      onGuardar={(nota) => {
                        onAgregar(key, nota.titulo, nota.descripcion);
                        setAbrirCrearNotas(false);
                      }}
                      tituloNota={tituloNota}
                      descripcionNota={descripcionNota}
                      setTituloNota={setTituloNota}
                      setDescripcionNota={setDescripcionNota}
                      setAbrirCrearNotas={setAbrirCrearNotas}
                    />
                  )}
                </section>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default DetalleLibro;
