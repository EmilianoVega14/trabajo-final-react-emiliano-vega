import React from "react";
import { useState } from "react";

export const ItemCount = ({ inicial, stock, funcionAgregar }) => {
  const [contador, setContador] = useState(inicial);

  const incrementar = () => {
    if (contador < stock) {
      setContador(contador + 1);
    }
  };
  const decrementar = () => {
    if (contador > inicial) {
      setContador(contador - 1);
    }
  };
  return (
    <>
      <div className="iC_Contenedor">
        <button
          className="iC_BotonAgregarAlCarrito"
          onClick={() => funcionAgregar(contador)}
        >
          Agregar al carrito
        </button>

        <div className="iC_Contador">
          <button onClick={decrementar}> - </button>
          <p> {contador}</p>
          <button onClick={incrementar}> + </button>
        </div>
      </div>
    </>
  );
};

export default ItemCount;
