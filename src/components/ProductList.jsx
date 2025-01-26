import React from 'react'
import {useState, useEffect} from 'react'
import axios from 'axios'
import "./ProductList.css"
import { useNavigate, useParams } from 'react-router-dom'


const ProductList = ({ searchTerm, triggerSearch, resetSearch }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();

  // Cargar los productos desde la API
  useEffect(() => {
    axios
      .get("http://localhost:3001/productItems")
      .then((response) => {
        setProducts(response.data);
        setFilteredProducts(response.data.slice(0, 4)); // Mostrar los primeros 4 productos al inicio
      })
      .catch((error) => console.error("Error al cargar los productos:", error));
  }, []);

  // Filtrar los productos cuando se activa el trigger
  useEffect(() => {
    if (triggerSearch) {
      const filtered = products
        .filter((product) =>
          (product.info || "").toLowerCase().includes((searchTerm || "").toLowerCase())
        )
        .slice(0, 4); // Limitar a 4 productos
      setFilteredProducts(filtered);
      resetSearch(); // Resetear el trigger
    }
  }, [triggerSearch]);

  const selectedProduct = id
    ? products.find(product => product.id === parseInt(id))
    : null

  const handleNavigate = (id) => {
    navigate( `/product/${id}`)
  };

  return (
    <div>
      {!selectedProduct ? (
        <ul className="dataResult">
          {filteredProducts.map((product) => (
            <li key={product.id} className="items">
              <button onClick={() => handleNavigate(product.id)}>
                <div className="image-data">
                  <div className="image-data-container">
                    <div className="image">
                      <img
                        className="product-image"
                        src={product.imageUrl}
                        width="100"
                      />
                    </div>
                    <div className="image-price-info">
                      <br />
                      <p className="image-price">${product.price}</p>
                      <br />
                      <p className="image-info">{product.info}</p>
                    </div>
                  </div>
                </div>
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <div className="container">
          <div className="sub-container">
            <div className="first-section">
              <img src={selectedProduct.imageUrl} />
              <br />
              <h2>
                Descripción del producto
              </h2>
              <br />
              <p>{selectedProduct.description}</p>
            </div>
            <div className="second-section">
              <p>
                <b>{selectedProduct.info}</b>
              </p>
              <p>$ {selectedProduct.price}</p>
              <button>Comprar</button>
              <button onClick={() => navigate("/")}>Cerrar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductList;
