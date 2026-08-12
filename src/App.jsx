import { useState, useEffect } from "react";
import "./App.css";
import Buscador from "./components/Buscador";
import MisLibros from "./components/MisLibros";
import ResultadosBusqueda from "./components/ResultadosBusqueda";

function App() {
  const [busquedaInput, setBusquedaInput] = useState("");
  const [buscando, setBuscando] = useState(false);
  const [libros, setLibros] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [misLibros, setMisLibros] = useState(() => {
    const guardados = localStorage.getItem("misLibros");
    return guardados ? JSON.parse(guardados) : [];
  });

  useEffect(() => {
    localStorage.setItem("misLibros", JSON.stringify(misLibros));
  }, [misLibros]);

  const buscarLibro = async () => {
    try {
      setLoading(true);
      setError(false);
      setBuscando(true);
      const response = await fetch(
        `https://openlibrary.org/search.json?q=${encodeURIComponent(busquedaInput)}`,
      );

      if (!response.ok) {
        throw new Error("Error en la petición");
      }
      const data = await response.json();
      setLibros(data.docs);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const agregarLibro = (libro) => {
    const nuevoLibro = {
      key: libro.key,
      title: libro.title,
      author_name: libro.author_name,
      cover_i: libro.cover_i,
    };

    const existe = misLibros.some(
      (libroGuardado) => libroGuardado.key === libro.key,
    );
    if (existe) {
      return;
    }

    setMisLibros((prevMisLibros) => [...prevMisLibros, nuevoLibro]);
  };

  const eliminarLibro = (keyLibro) => {
    setMisLibros((prevMisLibros) =>
      prevMisLibros.filter((libro) => libro.key !== keyLibro),
    );
  };

  return (
    <main className="min-h-screen bg-slate-100 px-6 py-10">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-8 text-center text-4xl font-bold text-slate-800">
          Book Explorer
        </h1>
        <Buscador
          buscarLibro={buscarLibro}
          busquedaInput={busquedaInput}
          setBusquedaInput={setBusquedaInput}
        />

        <MisLibros misLibros={misLibros} onEliminar={eliminarLibro} />

        <ResultadosBusqueda
          loading={loading}
          error={error}
          buscando={buscando}
          libros={libros}
          misLibros={misLibros}
          onAgregar={agregarLibro}
        />
      </div>
    </main>
  );
}

export default App;
