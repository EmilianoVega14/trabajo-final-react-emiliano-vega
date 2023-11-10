import { Routes, Route, BrowserRouter } from "react-router-dom";
import { Nosotros } from "./Componentes/nosotros/Nosotros";
import { ItemDetailConteiner } from "./Componentes/ItemDetailConteiner/ItemDetailConteiner";
import ItemListConteiner from "./Componentes/ItemListContainer/ItemListConteiner";
import NavBar from "./Componentes/NavBar/NavBar";
import "./main.css";
import { CarritoProvider } from "./context/carritoContext";
import { Cart } from "./Componentes/Cart/Cart";
import CheckOut from "./Componentes/CheckOut/CheckOut";

function App() {
  return (
    <div>
      <BrowserRouter>
        <CarritoProvider>
          <NavBar />
          <Routes>
            <Route path="/" element={<ItemListConteiner />} />
            <Route path="/productos" element={<ItemListConteiner />} />
            <Route path="/item/:id" element={<ItemDetailConteiner />} />
            <Route
              path="/productos/:idCategoria"
              element={<ItemListConteiner />}
            />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<CheckOut />} />
            <Route path="/nosotros" element={<Nosotros />} />
            <Route path="*" element={<h3>Sitio en construcción</h3>} />
          </Routes>
        </CarritoProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
