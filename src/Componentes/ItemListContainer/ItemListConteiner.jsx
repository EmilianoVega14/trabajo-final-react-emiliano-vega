import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ItemList from "../ItemList/ItemList";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../service/config";
//import { getUnProductoPorId } from "../asincmock";
// import { getProductos } from "../asincmock";
// Este es el contenedor de la lista de los productos que voy a tener en mi proyecto.
// esta logica tiene el objetivo solamente de pedir los productos a la base de datos y setear la informacion en un estado.
// Lo que queremos es tomar la informacion y setearlo en otro componente que se encargue de mostrarlo en una lista.

export const ItemListConteiner = () => {
  const [productos, setProductos] = useState([]);
  const [titulo, setTitulo] = useState("productos");

  const { idCategoria } = useParams();

  useEffect(() => {
    const misProductos = idCategoria
      ? query(
          collection(db, "productos"),
          where("categoria", "==", idCategoria)
        )
      : collection(db, "productos");

    getDocs(misProductos)
      .then((res) => {
        const nuevosProductos = res.docs.map((doc) => {
          const data = doc.data();
          return { id: doc.id, ...data };
        });
        setProductos(nuevosProductos);
      })
      .catch((error) => console.log("Error al obtener productos:", error));
  }, [idCategoria]);

  /* useEffect(() => {
    getProductos().then((res) => {
      if (categoria) {
        setProductos(res.filter((prod) => prod.categoria === categoria));
        setTitulo(categoria);
      } else {
        setProductos(res);
        setTitulo("Productos");
      }
    });
  }, [categoria]); */

  return (
    <div>
      <ItemList productos={productos} titulo={titulo} />
    </div>
  );
};

export default ItemListConteiner;
