import React from 'react'
import {useState, useEffect} from 'react'
import axios from 'axios'
import "./ProductList.css"


const ProductList = ({searchTerm, triggerSearch, resetSearch}) => {
    const [products, setProducts] = useState([])
    const [filteredProducts, setFilteredProducts] = useState([])
    const [selectedProduct, setSelectedProduct] = useState(null)
    
    //obtengo los datos de los productos
    useEffect(() => {
    axios.get("http://localhost:3001/productItems")
    .then(response => {
        console.log('Datos recibidos:', response.data)
        setProducts(response.data)
        setFilteredProducts(response.data.slice(0,4)) // mostrar los primeros 4 productos al inicio
    })
    .catch(error => console.log("Error al cargar los productos:", error))
}, [])

// filtrar los productos cuando se activa el trigger
    useEffect(() => {
      if (triggerSearch) {
        const filtered = products.filter(product => 
          (product.info || "").toLowerCase().includes((searchTerm || "").toLowerCase()) 
        ).slice(0,4) // limitar a 4 productos
        setFilteredProducts(filtered)
        resetSearch() // resetea el trigger
      }
    }, [triggerSearch])

    // muestra solamente el producto seleccionado
    const handleShowDetails = (product) => {
        console.log('selected product', product)
        setSelectedProduct(product) // Actualiza el estado con el producto seleccionado
    }

    // muestra la lista completa de productos
    const handleCloseDetails = () => {
        console.log('cerrar')
        setSelectedProduct(null)
    }
return (
        <div>
            <ul className = {`dataResult ${selectedProduct ? "hidden" : ""}`}>
                {filteredProducts.map(product => 
                    <li key={product.id} className = "items">
                        <button onClick = {() => handleShowDetails(product)}>
                            <div className = "image-data">
                                {/*contenedor que envuelve dos secciones*/}
                                <div className = "image-data-container">
                                    <div className = "image">
                                        <img className = "product-image" src = {product.imageUrl}
                                        width = "100"
                                        />
                                    </div>
                                    <div className = "image-price-info">
                                        <br />
                                        <p className = "image-price">${product.price}</p>
                                        <br />
                                        <p className = "image-info">{product.info}</p>
                                    </div>
                                </div>
                              </div>
                        </button >
                    </li>
                    )}
            </ul>

                    
            {/* Mostrar detalles del producto seleccionado */}
            <div className="unique-product-data-result">
                {selectedProduct && (
                  <div className="product-details">
                      {/* Contenedor principal dividido en dos secciones */}
                      <div className="product-details-container">
                          {/* Primera sección: Imagen */}
                          <div className="product-image-description-productDescription-container">
                            <img
                              className="only-one-image"
                              src={selectedProduct.imageUrl}
                            />
                            <h2>
                              <strong>Descripción del producto</strong>
                            </h2>
                            <p className="product-description">{selectedProduct.description}</p>
                          </div>

                          {/* Segunda sección: Detalles del producto */}
                          <div className="product-name-price-container">
                            <p className="name"><strong>{selectedProduct.info}</strong></p>
                            <p className="price"><strong>${selectedProduct.price}</strong></p>
                            <button className="buy-button">Comprar</button>
                            <button className="close-button" onClick={handleCloseDetails}>
                              Cerrar
                            </button>
                          </div>
                      </div>
                  </div>
                )}
            </div>
      </div>
    )
}

export default ProductList