import { useContext } from "react";
import { Link } from "react-router-dom";
import "./cardwidget.css";
import { carritoContext } from "../../context/carritoContext";

export const CardWidget = () => {
  const { cantidadTotal } = useContext(carritoContext);

  return (
    <>
      <div className="cardwidget">
        <Link to="/cart">
          <i className="bi bi-cart3"></i>
          {cantidadTotal >= 0 && (
            <p style={{ fontSize: "18px" }}>{cantidadTotal}</p>
          )}
        </Link>
      </div>
    </>
  );
};

export default CardWidget;
