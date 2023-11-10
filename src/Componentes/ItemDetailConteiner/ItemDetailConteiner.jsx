import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
//import { getUnProductoPorId } from "../asincmock";
import ItemDetail from "../ItemDetail/ItemDetail";
import { getDoc, doc } from "firebase/firestore";
import { db } from "../../service/config";

export const ItemDetailConteiner = () => {
  const [item, setItem] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const nuevoDoc = doc(db, "productos", id);

    getDoc(nuevoDoc)
      .then((resp) => {
        const data = resp.data();
        const nuevoProducto = { id: resp.id, ...data };
        setItem(nuevoProducto);
      })
      .catch((error) => console.log(error));
  }, [id]);

  /* useEffect(() => {
    getUnProductoPorId(id).then((respuesta) => {
      setItem(respuesta);
    });
  }, [id]); */

  return <div>{item && <ItemDetail item={item} />}</div>;
};

export default ItemDetailConteiner;
