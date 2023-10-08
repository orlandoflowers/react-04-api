import { useState, useEffect } from "react";

const MiApi = ({ palabra }) => {
  const [datos, setDatos] = useState([]);
  const urlApi = "https://api.victorsanmartin.com/feriados/en.json";

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const res = await fetch(urlApi);
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await res.json();
      setDatos(data.data); // Assuming data is an array
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  function formatDate(item) {
    const month = item.date.split("-")[1];

    switch (month) {
      case "01":
        item.date = "Enero";
        break;
      case "02":
        item.date = "Febrero";
        break;
      case "03":
        item.date = "Marzo";
        break;
      case "04":
        item.date = "Abril";
        break;
      case "05":
        item.date = "Mayo";
        break;
      case "06":
        item.date = "Junio";
        break;
      case "07":
        item.date = "Julio";
        break;
      case "08":
        item.date = "Agosto";
        break;
      case "09":
        item.date = "Septiembre";
        break;
      case "10":
        item.date = "Octubre";
        break;
      case "11":
        item.date = "Noviembre";
        break;
      case "12":
        item.date = "Diciembre";
        break;
      default:
        break;
    }

    return item;
  }

  const filteredData = palabra
    ? datos.filter(
        (item) =>
          item.title.toLowerCase().includes(palabra.toLowerCase()) ||
          item.type.toLowerCase().includes(palabra.toLowerCase()) ||
          item.extra.toLowerCase().includes(palabra.toLowerCase()) ||
          item.date.toLowerCase().includes(palabra.toLowerCase())
      )
    : datos;

  return (
    <div className="flex items-center flex-col w-3/4 m-4">
      <h1 className="m-4">Feriados en Chile</h1>
      <table className="table-fixed w-full text-md text-left text-gray-500">
        <thead className="text-lg text-gray-700 uppercase bg-gray-200">
          <tr>
            <th>Titulo</th>
            <th>Tipo</th>
            <th>Mes</th>
            <th>Irrenunciable</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.length > 0 ? (
            filteredData.map((item, index) => (
              <tr
                className="even:bg-gray-0 odd:bg-gray-50 leading-8"
                key={index}
              >
                <td>{item.title}</td>
                <td>{item.type}</td>
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
                <h1>No hay datos que coincidan con la búsqueda</h1>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default MiApi;
