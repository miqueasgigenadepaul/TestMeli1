import React from 'react'
import {useState, useEffect} from 'react'
import axios from 'axios'
import "./ProductList.css"


const ProductList = ({searchTerm}) => {
    const [products, setProducts] = useState([])
    const [selectedProduct, setSelectedProduct] = useState(null)
    
    //obtengo los datos de los productos
    useEffect(() => {
    axios.get("http://localhost:3001/productItems")
    .then(response => {
        console.log('Datos recibidos:', response.data)
        setProducts(response.data)
    })
    .catch(error => console.log("Error al cargar los productos:", error))
}, [])

    const filteredProducts = products.filter(product => 
    product.info.toLowerCase().includes(searchTerm.toLowerCase())
    )

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
                            <div className = "image-data-container">
                                <img className = "productImage" src = {product.imageUrl}
                                    width = "100"
                                />
                                <br />
                                ${product.price}
                                <br />
                                {product.info}
                            </div>
                        </button >
                    </li>
                    )}
            </ul>

            {/*mostrar detalles del producto seleccionado*/}
            <div className = "unique-product-data-result">
            {selectedProduct && (
                <div className="product-details">
                    <img className = 'only-one-image' src = {selectedProduct.imageUrl}/>
                    <p><strong>Nombre:</strong> {selectedProduct.info}</p>
                    <h2><strong>Descripción del producto</strong></h2>
                    <p class = "precio"><strong>Precio:</strong> {selectedProduct.price}</p>
                    <p className = "product-description">{selectedProduct.description}</p>
                    <button className = "buy-button">comprar</button>
                    <button className = "close-button" onClick={handleCloseDetails}>Cerrar</button>
                </div>
            )}
            </div>
        </div>
    )
}

export default ProductList