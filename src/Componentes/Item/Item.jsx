import React from "react";
import { Link } from "react-router-dom";

export const Item = ({ productos }) => {
  return (
    <div className="contenedorPadreItem">
      <img src={productos.img} alt={productos.nombre} />

      <div className="contenedorInformacionItem">
        <h3>{productos.nombre}</h3>
        <p> $ {productos.precio}</p>

        <Link to={`/item/${productos.id}`}> Ver Más </Link>
      </div>
    </div>
  );
};

export default Item;
