import React from "react";
import { Link } from "react-router-dom";

export const Item = ({ productos }) => {
  return (
    <div className="contenedorPadreItem">
      <img src={productos.img} alt={productos.nombre} />

      <div className="contenedorInformacionItem">
        <h5>{productos.nombre}</h5>
        <p className="precio">${productos.precio}</p>
        <p>#{productos.id}</p>

        <Link to={`/item/${productos.id}`}> Ver Más </Link>
      </div>
    </div>
  );
};

export default Item;
