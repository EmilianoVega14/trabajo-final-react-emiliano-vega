import React from "react";
import { useState, useContext } from "react";
import { carritoContext } from "../../context/carritoContext";
import { db } from "../../service/config";
import { collection, addDoc, updateDoc, doc, getDoc } from "firebase/firestore";
import { Link } from "react-router-dom";

export const CheckOut = () => {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [telefono, setTelefono] = useState("");
  const [email, setEmail] = useState("");
  const [emailConfirmacion, setEmailConfirmacion] = useState("");
  const [error, setError] = useState("");
  const [ordenId, setOrdenId] = useState("");

  const { carrito, vaciarCarrito, total } = useContext(carritoContext);

  const manejadorDeFormularios = (event) => {
    event.preventDefault();

    if (!nombre || !apellido || !telefono || !email || !emailConfirmacion) {
      setError(
        <p
          style={{
            color: "red",
            fontSize: "13px",
            marginBottom: "20px",
            marginLeft: "5px",
          }}
        >
          ** Por favor completa la informacion para generar la orden de compra
        </p>
      );
      return;
    }

    if (email !== emailConfirmacion) {
      setError(
        <p
          style={{
            color: "red",
            fontSize: "13px",
            marginBottom: "20px",
            marginLeft: "10px",
          }}
        >
          ** Los correos electronicos ingresados no coinciden
        </p>
      );
      return;
    }

    const orden = {
      items: carrito.map((prod) => ({
        id: prod.item.id,
        nombre: prod.item.nombre,
        cantidad: prod.cantidad,
      })),
      total: total,
      fecha: new Date(),
      nombre,
      apellido,
      telefono,
      email,
    };

    Promise.all(
      orden.items.map(async (productoOrden) => {
        const productoRef = doc(db, "productos", productoOrden.id);
        const productoDoc = await getDoc(productoRef);
        const stockActual = productoDoc.data().stock;
        await updateDoc(productoRef, {
          stock: stockActual - productoOrden.cantidad,
        });
      })
    )

      .then(() => {
        addDoc(collection(db, "ordenes"), orden)
          .then((docRef) => {
            setOrdenId(docRef.id);
            vaciarCarrito();
          })
          .catch((error) => {
            console.log("Error al crear la orden", error);
            setError("Error al crear la orden, por favor, vuelva a intentarlo");
          });
      })
      .catch((error) => {
        console.log("No se puede actualizar el Stock ", error);
        setError("no se puede actualizar el Stock, intente nuevamente");
      });
  };

  return (
    <>
      <h2 className="tituloCheckOut">Check Out</h2>
      <div className={`cO_Contenedor${ordenId ? " sinBordes" : ""}`}>
        <div className="cO_ContenedorProductos">
          {carrito.map((productos) => (
            <>
              <div key={productos.item.id} className="cO_Productos">
                <div>
                  <img src={productos.item.img} alt={productos.item.nombre} />
                </div>
                <div className="cO_DescripcionProducto">
                  <h3>{productos.item.nombre}</h3>
                  <p style={{ marginBottom: "10px" }}>
                    Cantidad: {productos.cantidad}
                  </p>
                  <p>
                    Subtotal:
                    <strong>
                      ${productos.item.precio * productos.cantidad}
                    </strong>
                  </p>
                </div>
              </div>
              <hr style={{ marginLeft: "10px" }} />
            </>
          ))}
        </div>

        {ordenId ? (
          <div className="cO_ContenedorSaludo">
            <p className="cO_MGracias"> Muchas gracias </p>
            <p className="cO_MGracias"> Hemos recibido tu pedido ! </p>
            <p className="cO_OrdenId">
              Tu Id de orden es: <strong> {ordenId} </strong>
            </p>
            <p className="cO_Msj">
              {" "}
              ** Nos pondremos en contacto a la brevedad.
            </p>
            <Link to="/" className="cO_SeguirComprando">
              Seguir comprando
            </Link>
          </div>
        ) : (
          <form
            onSubmit={manejadorDeFormularios}
            className="cO_ContenedorFormulario"
          >
            <h3 style={{ marginTop: "25px" }}>Completa el formulario</h3>
            <div>
              <input
                type="text"
                id="nombre"
                value={nombre}
                onChange={(event) => setNombre(event.target.value)}
                placeholder="Nombre"
                className="cO_Input"
              />
            </div>

            <div>
              <input
                type="text"
                id="apellido"
                value={apellido}
                onChange={(event) => setApellido(event.target.value)}
                placeholder="Apellido"
                className="cO_Input"
              />
            </div>

            <div>
              <input
                type="text"
                id="telefono"
                value={telefono}
                onChange={(event) => setTelefono(event.target.value)}
                placeholder="Teléfono"
                className="cO_Input"
              />
            </div>

            <div>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="Email"
                className="cO_Input"
              />
            </div>

            <div>
              <input
                type="email"
                id="emailConfirmacion"
                value={emailConfirmacion}
                onChange={(event) => setEmailConfirmacion(event.target.value)}
                placeholder="Confirma tu Email"
                className="cO_Input"
              />
            </div>

            {error && <p>{error}</p>}
            <div className="cO_BotonesFormulario">
              <Link to="/">Seguir Comprando</Link>
              <button type="submit"> Finalizar Compra </button>
            </div>
          </form>
        )}
      </div>
    </>
  );
};

export default CheckOut;
