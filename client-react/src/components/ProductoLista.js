import React from "react";
import Constancia from "../components/Constancia";
import ProductoContenedor from "./ProductoContenedor";

class ProductoLista extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
        };
    }

    async componentDidMount() {
        const respuesta = await fetch(`${Constancia.RUTA_API}`);
        const products = await respuesta.json();
        this.setState({
            products: products
        });
    }

    render() {
        return (
            <div>
                <div className = "column">
                    <h1 className = "is-size-3"> Ver productos </h1>
                </div>
                <div className = "table-container">
                    <table className = "table is-fullwidth is-bordered">
                        <thead>
                            <tr>
                                <th> IDProducto </th>
                                <th> Nombre </th>
                                <th> Precio </th>
                                <th> Descripcion </th>
                                <th> Imagen </th>
                                <th> Eliminar </th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.products.map(products => {
                                return <ProductoContenedor key = {products._id} products = {products}></ProductoContenedor>;
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default ProductoLista;