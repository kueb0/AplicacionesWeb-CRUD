import React from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Constancia from './components/Constancia';
import ProductoLista from './components/ProductoLista';
import ProductoEditar from './components/ProductoEditar';
import ProductoNavegacion from './components/ProductoNavegacion';
import ProductoAgregar from './components/ProductoAgregar';

import { Route, Routes, Link } from 'react-router-dom';

function App() {
  const [products, setProducts] = React.useState([]);

  React.useEffect(() => {
    fetch(`${Constancia.RUTA_API}`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      setProducts(data);
    })
    .catch((err) => {
      console.log(err.message);
    });
  }, []);

  console.log("Products", products);

  return (
    <div className = 'App'>
      <ProductoNavegacion></ProductoNavegacion>
      <header className = 'App-header'>
        <img src = {logo} className = "App-logo" alt = "logo"></img>
        {products.map((product) => (
          <div> 
            {product.nombre}, Precio: {product.precio} 
            <hr/>
          </div>
        ))}

        <div>
          <div className = 'section'>
              <Routes>
                <Route index element = {<ProductoLista/>}/>
                <Route path = '/agregar' element = {<ProductoAgregar/>}/>
                <Route path = '/ver' element = {<ProductoLista/>}/>
                <Route path = '/editar/:id' element = {<ProductoEditar/>}/>
                <Route path = '*' element = {<p> Ruta no encontrada </p>}/>
              </Routes>
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;


/*
<Link to = {`/editar/${product._id}`} className = "button is-info" style ={{marginLeft: "10px", backgroundColor: "purple"}}> Editar </Link> */