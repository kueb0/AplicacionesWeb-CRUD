import React from "react";
import { Link } from "react-router-dom";

class ProductoNavegacion extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mostrarMenu: false,
        };

        this.intercambiarEstadoMenu = this.intercambiarEstadoMenu.bind(this);
        this.ocultarMenu = this.ocultarMenu.bind(this);
    }

    ocultarMenu() {
        this.setState({
            mostrarMenu: false
        });
    }

    intercambiarEstadoMenu() {
        this.setState(state => {
            return {
                mostrarMenu: !state.mostrarMenu
            }
        });
    }

    render() {
        return (
            <nav className = "navbar navbar-expand-lg p-3 navbar-collapse" style = {{background: "LightPink"}} role = "navigation" aria-label = "main navigation">
                <div className = "navbar-brand">
                    <button onClick = {this.intercambiarEstadoMenu} className = {`navbar-burger ${this.state.mostrarMenu ? "is-active" : ""} is-warning button`} aria-label = "menu" aria-expanded = "false" data-target = "navbarBasicExample">
                        <span aria-hidden = "true" className = "navbar-toggler-icon"></span>
                        <span aria-hidden = "true" className = "navbar-toggler-icon"></span>
                    </button>
                </div>
                <div className = {`navbar-menu ${this.state.mostrarMenu ? "is-active" : ""}`}>
                    <div className = "navbar-end">
                        <Link onClick = {this.ocultarMenu} className = "navbar-item material-icons" to = "/ver" style = {{borderRadius: "4px", margin: "5px", border: "1px solid blue"}}> Ver Productos </Link>
                        <Link onClick = {this.ocultarMenu} className = "navbar-item material-icons" to = "/agregar" style = {{borderRadius: "4px", margin: "5px", border: "1px solid blue"}}> Agregar Productos </Link>
                    </div>
                </div>
            </nav>
        );
    }
}

export default ProductoNavegacion;