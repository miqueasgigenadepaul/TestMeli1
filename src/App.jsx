import {useState} from "react";
import "./App.css";
import SearchBar from "./components/SearchBar";
import ProductList from "./components/ProductList";
import {Routes, Route} from "react-router-dom"

// caja de busqueda

const App = () => {
  
  const [searchTerm, setSearchTerm] = useState('')
  const [triggerSearch, setTriggerSearch] = useState(false) // este estado no es necesario, podes utilizar search term para ejecutar el rerender

  const handleSearchChange = (event) => {
    console.log(event.target.value)
    setSearchTerm(event.target.value)
}

  const handleSearchClick = (e) => {
    e.preventDefault();
    setTriggerSearch(true);
}

  return (
    <div>
      <SearchBar searchTerm = {searchTerm} 
                handleSearchChange = {handleSearchChange}
                handleSearchClick = {handleSearchClick}
      />
      <Routes>
        <Route path = "/" element = {<ProductList searchTerm = {searchTerm}
          triggerSearch = {triggerSearch}
          resetSearch = {() => setTriggerSearch(false)}
        />} />
        <Route path = "/product/:id" element = {<ProductList searchTerm = {searchTerm}
          triggerSearch = {triggerSearch}
          resetSearch = {() => setTriggerSearch(false)}
        />} />
      </Routes>
    </div>
  )
}

export default App

