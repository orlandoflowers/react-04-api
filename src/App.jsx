import { useState } from "react";
import Buscador from "./components/Buscador";
import MiApi from "./components/MiApi";

const App = () => {
  // 1. Estado `searchTerm`: Inicializo un estado para el término de búsqueda.
  const [searchTerm, setSearchTerm] = useState("");

  // 2. Función `handleSearch`: Esta función actualiza el estado `searchTerm` con el valor de búsqueda.
  const handleSearch = (searchTerm) => {
    setSearchTerm(searchTerm);
  };

  // 3. Función `handleReset`: Esta función restablece el término de búsqueda a una string vacía. Limpio el input
  const handleReset = () => {
    setSearchTerm("");
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-5xl font-bold text-center my-8">
        🇨🇱 Buscador de feriados de Chile del 2023 🇨🇱
      </h1>
      <p className="text-center text-gray-500 mb-8">
        Busca por motivo, tipo y mes
      </p>
      <hr className="w-3/4 border-gray-500 mb-8" />

      {/* 4. Componente `Buscador`: Paso las funciones `handleSearch` y `handleReset` como props. */}
      <Buscador onSearch={handleSearch} onReset={handleReset} />

      {/* 5. Componente `MiApi`: Pasamos el estado `searchTerm` como props para la búsqueda. */}
      <MiApi palabra={searchTerm} />

      <p className="text-center text-gray-500 mt-8 mb-20">
        <a href="https://www.conafech.cl" target="_blank" rel="noreferrer">
          Buscador de feriados de Chile, una creación de la Corporación Nacional
          del Feriado de Chile CONAFECH 2023
        </a>
      </p>
    </div>
  );
};

export default App;
