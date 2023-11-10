import React from "react";
import { useContext } from "react";
import { carritoContext } from "../../context/carritoContext";

export const CartItem = ({ item, cantidad }) => {
  const { eliminarProducto } = useContext(carritoContext);
  return (
    <>
      <div key={item.id} className="cI_Contenedor">
        <img src={item.img} alt={item.nombre} />
        <div className="cI_ContenedorInformacion">
          <div className="cI_InformacionProducto">
            <h3>{item.nombre}</h3>
            <p> $ {item.precio}</p>
          </div>

          <div className="cI_ContenedorCantidad">
            <p> Cantidad: {cantidad}</p>
            <button onClick={() => eliminarProducto(item.id)}>
              | Eliminar |
            </button>
          </div>
        </div>
      </div>
      <hr />
    </>
  );
};

export default CartItem;
