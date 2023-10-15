import React, { useState } from "react";

const Buscador = ({ onSearch, onReset }) => {
  // 1. Estado `searchTerm`: Inicializo un estado local para el término de búsqueda.
  const [searchTerm, setSearchTerm] = useState("");

  // 2. Función `handleSearch`: Esta función llama a la función `onSearch` proporcionada como prop y luego borra el input
  const handleSearch = () => {
    onSearch(searchTerm);
    setSearchTerm("");
  };

  // 3. Función `handleSubmit`: Manejador para el envío del form que llama a `handleSearch`.
  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch();
  };

  // 4. Función `handleReset`: Esta función llama a la función `onReset` proporcionada como prop para restablecer la búsqueda con el boton.
  const handleReset = () => {
    onReset();
  };

  return (
    <div className="flex flex-col items-center m-4">
      <form onSubmit={handleSubmit}>
        <label htmlFor="search">Buscar</label>
        <input
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-96 focus:ring-blue-500 focus:border-blue-500 block p-2.5"
          type="text"
          placeholder="Busca por titulo, tipo, mes, irrenunciable"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
          type="submit"
        >
          Buscar
        </button>
      </form>

      <div className="flex w-96">
        <button
          className="bg-gray-400 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-4"
          onClick={handleReset}
        >
          Limpia filtros
        </button>
      </div>
    </div>
  );
};

export default Buscador;
