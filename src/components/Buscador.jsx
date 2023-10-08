const Buscador = ({ palabra, setPalabra }) => {
  return (
    <form className="flex flex-col items-center m-4">
      <label htmlFor="search">Buscar</label>
      <input
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-96 focus:ring-blue-500 focus:border-blue-500 block p-2.5"
        type="text"
        placeholder="Busca si es irrenunciable, por mes, tipo...."
        value={palabra}
        onChange={(e) => setPalabra(e.target.value)}
      />
    </form>
  );
};

export default Buscador;
