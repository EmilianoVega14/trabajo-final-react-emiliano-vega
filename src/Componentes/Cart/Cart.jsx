import React from "react";
import { useContext } from "react";
import { carritoContext } from "../../context/carritoContext";
import { Form, Link } from "react-router-dom";
import CartItem from "../CartItem/CartItem";

export const Cart = () => {
  const { carrito, vaciarCarrito, total, cantidadTotal } =
    useContext(carritoContext);

  if (cantidadTotal === 0) {
    return (
      <>
        <div
          style={{
            height: "400px",
            width: "80%",
            border: "solid 1px #619136",
            padding: "10px",
            marginLeft: "120px",
            marginTop: "80px",
            textAlign: "center",
          }}
          n
        >
          <h2
            style={{
              color: "#619136",
              marginTop: "100px",
              marginBottom: "50px",
              fontSize: "40px",
            }}
          >
            Aún no has agregado productos al carrito
          </h2>
          <Link
            to="/"
            style={{
              height: "50px",
              width: "230px",
              color: "white",
              backgroundColor: "#619136",
              borderRadius: "10px",
              textAlign: "center",
              paddingTop: "10px",
              textDecoration: "none",
              marginRight: "15px",
              padding: "10px",
              paddingRight: "30px",
              paddingLeft: "30px",
            }}
          >
            Ver Productos
          </Link>
        </div>
      </>
    );
  }

  return (
    <>
      <h2 className="tituloCarrito">Carrito</h2>
      <div className="cart_Contenedor">
        {carrito.map((item) => (
          <CartItem key={item.id} {...item} />
        ))}
        <div className="cart_ContenedorTotales">
          <div className="cart_Totales">
            <h3> Total de {cantidadTotal} articulos: </h3>
            <p>${total}</p>
          </div>
          <div className="cart_BotonesTotales">
            <button onClick={() => vaciarCarrito()}>| Vaciar Carrito |</button>
            <Link to="/checkout"> Finalizar Compra</Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
