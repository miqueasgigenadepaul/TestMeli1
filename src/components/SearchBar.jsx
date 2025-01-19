import React from 'react'
import "./SearchBar.css"
import SearchIcon from '@mui/icons-material/Search';
import logoMeliSinFondo from "./logoMeliSinFondo.png";

const SearchBar = ({searchTerm, handleSearchChange}) => {

//event handler para el boton
const pressButton = (e) => {
    e.preventDefault()
}

return (
    <form className = "searchBar">
                <img className = "logoMeli" src = {logoMeliSinFondo} />
                <input value = {searchTerm} onChange = {handleSearchChange}
                    placeholder = "Nunca dejes de buscar"
                />
                <div>
                    <button type = "submit" onClick = {pressButton} className = "searchIcon">
                        <SearchIcon />
                    </button>
                </div>
    </form>
    )
}

export default SearchBar

