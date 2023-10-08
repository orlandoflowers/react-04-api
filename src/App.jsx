import { useState } from "react";
import Buscador from "./components/Buscador";
import MiApi from "./components/MiApi";

const App = () => {
  const [palabra, setPalabra] = useState("");

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-5xl font-bold text-center my-8">
        🇨🇱 Buscador de feriados de Chile del 2023 🇨🇱
      </h1>
      <p className="text-center text-gray-500 mb-8">
        Busca por motivo, tipo y mes
      </p>
      <hr className="w-3/4 border-gray-500 mb-8" />
      <Buscador palabra={palabra} setPalabra={setPalabra} />
      <MiApi palabra={palabra} />
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
