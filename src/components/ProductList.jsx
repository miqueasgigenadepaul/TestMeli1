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

    const handleShowDetails = (product) => {
        setSelectedProduct(product); // Actualiza el estado con el producto seleccionado
    }
return (
        <div>
            <ul className = "dataResult">
                {filteredProducts.map(product => 

                    <li key={product.id} className = "items">
                        <button onClick = {handleShowDetails}>
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
            
        </div>
    )
}

export default ProductList