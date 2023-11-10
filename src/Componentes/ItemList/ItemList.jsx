// Lo que hago aca es llamar como prop al estado creado en itemListConteiner "productos" para mapearlo y obtener la informacion de cada uno de los objetos de "misProductos" para luego renderizarlos.

import Item from "../Item/Item";

export const ItemList = ({ productos, titulo }) => {
  return (
    <div className="container">
      <h2>{titulo}</h2>

      <div className="itemList">
        {productos.map((productos) => (
          <Item productos={productos} key={productos.id} />
        ))}
      </div>
    </div>
  );
};

export default ItemList;
