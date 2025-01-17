import React from 'react'
import "./SearchBar.css"
import axios from 'axios'
import {useState, useEffect} from 'react'
import SearchIcon from '@mui/icons-material/Search';
import logoMeliSinFondo from "./logoMeliSinFondo.png";

const SearchBar = () => {

const [products, setProducts] = useState([])
const [newProduct, setNewProduct] = useState('')

useEffect(() => {
    axios.get("http://localhost:3001/productItems")
    .then(response => {
        console.log('Datos recibidos:', response.data)
        setProducts(response.data)
    })
    .catch(error => console.log("Error al cargar los productos:", error))
}, [])

const handleProductChange = (event) => {
    console.log(event.target.value)
    setNewProduct(event.target.value)
}



return (
    <div className = "searchBar">
            <form>
                <img className = "logoMeli" src = {logoMeliSinFondo} />
                <input value = {newProduct} onChange = {handleProductChange}/>
                <div className = "searchIcon">
                    <SearchIcon />
                </div>
            </form>
            <ul className = "dataResult">
                {products.map(product => {
                    console.log('producto', product)
                    return <li key = {product.id}>{product.name}{product.price}</li>
                })}
            </ul>
    </div>
    )
}

export default SearchBar

