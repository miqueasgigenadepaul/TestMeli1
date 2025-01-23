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

            <div className = "container">
            {selectedProduct && (
              <div className = "sub-container">
                <div className = "first-section">
                  <img src = {selectedProduct.imageUrl} />
                  <br />
                  <h2><b>Descripcion del producto</b></h2>
                  <br />
                  <p>{selectedProduct.description}</p>
                </div>
                <div className = "second-section">
                  <p><b>{selectedProduct.info}</b></p> 
                  <p>$ {selectedProduct.price}</p>
                  <button>Comprar</button>
                  <button onClick = {handleCloseDetails}>Cerrar</button>
                </div>
              </div>
            )}
            </div>
      </div>
    )
}

export default ProductList