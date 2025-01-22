import React from 'react'
import "./SearchBar.css"
import SearchIcon from '@mui/icons-material/Search';
import logoMeliSinFondo from "./logoMeliSinFondo.png";

const SearchBar = ({searchTerm, handleSearchChange, handleSearchClick}) => {

return (
    <form className = "searchBar">
                <img className = "logoMeli" src = {logoMeliSinFondo} />
                <input value = {searchTerm} onChange = {handleSearchChange}
                    placeholder = "Nunca dejes de buscar"
                />
                <div>
                    <button type = "submit" onClick = {handleSearchClick} className = "searchIcon">
                        <SearchIcon />
                    </button>
                </div>
    </form>
    )
}

export default SearchBar
