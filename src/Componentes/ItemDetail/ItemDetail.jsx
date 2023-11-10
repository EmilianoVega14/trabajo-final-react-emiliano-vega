import { useState } from "react";
import { Link } from "react-router-dom";
import ItemCount from "../ItemCount/ItemCount";
import { carritoContext } from "../../context/carritoContext";
import { useContext } from "react";

export const ItemDetail = ({ item }) => {
  const [agregarCantidad, setAgregarCantidad] = useState(0);

  const { agregarProducto } = useContext(carritoContext);

  const manejadorCantidad = (cantidad) => {
    setAgregarCantidad(cantidad);

    agregarProducto(item, cantidad);
  };

  return (
    <div>
      <div className="iD_Contenedor">
        <div className="iD_ContenedorImagen">
          <img src={item.img} alt={item.nombre} />
        </div>

        <div className="iD_ContenedorInformacionProducto">
          <h3>{item.nombre}</h3>
          <p className="iD_InformacionProductoPrecio">${item.precio}</p>
          <p className="iD_InformacionTituloDetalle"> Descripcion </p>
          <p className="iD_InformacionProductoDetalle">{item.detalle}</p>
          {/* <p>#{item.id}</p> */}
          <p className="iD_InformacionProductoStock">
            Stock: {item.stock} unidades
          </p>
          {agregarCantidad > 0 ? (
            <div className="iD_BtnsDspAgregarCarrito">
              <Link to="/cart/"> Ir al carrito </Link>
              <Link to="/"> Seguir comprando </Link>
            </div>
          ) : (
            <ItemCount
              inicial={1}
              stock={item.stock}
              funcionAgregar={manejadorCantidad}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ItemDetail;
