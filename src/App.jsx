import {useState} from "react";
import "./App.css";
import SearchBar from "./components/SearchBar";
import ProductList from "./components/ProductList";


// caja de busqueda

const App = () => {
  
  const [searchTerm, setSearchTerm] = useState('')
  const [triggerSearch, setTriggerSearch] = useState(false)

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
      <ProductList searchTerm = {searchTerm}
        triggerSearch = {triggerSearch}
        resetSearch = {() => setTriggerSearch(false)}
      />
    </div>
  )
}

export default App

