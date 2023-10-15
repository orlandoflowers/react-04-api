import { useState, useEffect } from "react";

const MiApi = ({ palabra }) => {
  // 1. Estados `datos` y `reverseOrder`: Inicializo estados para los datos de feriados y el orden de la tabla.
  const [datos, setDatos] = useState([]);
  const [reverseOrder, setReverseOrder] = useState(false);

  // 2. URL de la API: defino la variable de URL de la API para obtener datos.
  const urlApi = "https://api.victorsanmartin.com/feriados/en.json";

  useEffect(() => {
    // 3. Efecto `useEffect`: Cargo los datos de la API al montar el componente. con [] para que se ejecute una vez.
    getData();
  }, []);

  const getData = async () => {
    // 4. Función `getData`: Obtiene los datos de la API y los almacena en el estado `datos`. Uso fetch.
    const res = await fetch(urlApi);
    const data = await res.json();
    setDatos(data.data);
  };

  const handleReverseOrder = () => {
    // 5. Función `handleReverseOrder`: Invierte el orden de la tabla.
    setReverseOrder(!reverseOrder);
  };

  function formatDate(item) {
    // 6. Función `formatDate`: Convierte las fechas a nombres de mes.
    const month = item.date.split("-")[1];
    let monthName = "";
    // Switch para convertir el número de mes en nombre de mes.
    switch (month) {
      case "01":
        monthName = "Enero";
        break;
      case "02":
        monthName = "Febrero";
        break;
      case "03":
        monthName = "Marzo";
        break;
      case "04":
        monthName = "Abril";
        break;
      case "05":
        monthName = "Mayo";
        break;
      case "06":
        monthName = "Junio";
        break;
      case "07":
        monthName = "Julio";
        break;
      case "08":
        monthName = "Agosto";
        break;
      case "09":
        monthName = "Septiembre";
        break;
      case "10":
        monthName = "Octubre";
        break;
      case "11":
        monthName = "Noviembre";
        break;
      case "12":
        monthName = "Diciembre";
        break;
      default:
        break;
    }
    return { ...item, date: monthName };
  }

  function formatDay(item) {
    // 7. Función `formatDay`: Obtiene el día a partir de la fecha.
    let day = item.date.split("-")[2];
    return day;
  }

  const compareDia = (a, b) => {
    // 8. Función `compareDia`: Compara los días para ordenar la tabla.
    const dayA = parseInt(formatDay(a), 10);
    const dayB = parseInt(formatDay(b), 10);
    return reverseOrder ? dayB - dayA : dayA - dayB;
  };

  // 9. Filtrado de datos: Filtramos los datos según el término de búsqueda.
  const filteredData = palabra
    ? datos.filter(
        (item) =>
          item.title.toLowerCase().includes(palabra.toLowerCase()) ||
          item.type.toLowerCase().includes(palabra.toLowerCase()) ||
          item.extra.toLowerCase().includes(palabra.toLowerCase()) ||
          formatDate(item).date.toLowerCase().includes(palabra.toLowerCase())
      )
    : datos;

  return (
    <div className="flex items-center flex-col w-3/4 m-4">
      <h1 className="m-4">Feriados en Chile</h1>

      <button
        className="bg-blue-500 hover.bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
        onClick={handleReverseOrder}
      >
        {reverseOrder ? "Revertir Orden" : "Ordenar Ascendente"}
      </button>

      <table className="table-fixed w-full text-md text-left text-gray-500">
        <thead className="text-lg text-gray-700 uppercase bg-gray-200">
          <tr>
            <th>Titulo</th>
            <th>Tipo</th>
            <th>Dia</th>
            <th>Mes</th>
            <th>Irrenunciable</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.length > 0 ? (
            filteredData
              .sort(compareDia) // 10. Ordenamos los datos según la función `compareDia`.
              .map((item, index) => (
                <tr
                  className="even:bg-gray-0 odd:bg-gray-50 leading-8"
                  key={index}
                >
                  <td>{item.title}</td>
                  <td>{item.type}</td>
                  <td>{formatDay(item)}</td>
                  <td>{formatDate(item).date}</td>
                  <td
                    className={`text-${
                      item.extra.toLowerCase().includes("irrenunciable")
                        ? "green"
                        : "red"
                    }-500`}
                  >
                    {item.extra.toLowerCase().includes("irrenunciable")
                      ? "Si"
                      : "No"}
                  </td>
                </tr>
              ))
          ) : (
            <tr>
              <td colSpan="4">
                <h1 className="text-red-500">
                  No hay datos que coincidan con la búsqueda
                </h1>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default MiApi;
