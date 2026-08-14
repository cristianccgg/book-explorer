const Nota = ({ nota, onEditar, onEliminarNota, libroKey }) => {
  return (
    <div className="mt-6 space-y-2 rounded-xl bg-slate-50 p-5">
      <p className="text-sm font-medium text-slate-500">Fecha</p>

      <p className="text-2xl font-bold text-slate-800">
        {new Date(nota.fecha).toLocaleDateString("es-CO")}
      </p>

      <p className="text-sm font-medium text-slate-500">Título Nota</p>

      <p className="text-2xl font-bold text-slate-800">{nota.titulo}</p>

      <p className="text-sm font-medium text-slate-500">Descripción</p>

      <p className="text-2xl font-bold text-slate-800">{nota.descripcion}</p>

      <button
        onClick={() => onEditar(nota)}
        className="mr-5 mt-5 rounded-lg bg-slate-800 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-700"
      >
        Editar Nota
      </button>

      <button
        onClick={() => {
          onEliminarNota(libroKey, nota.id);
        }}
        className="mt-5 rounded-lg bg-slate-800 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-700"
      >
        Eliminar Nota
      </button>
    </div>
  );
};

export default Nota;
