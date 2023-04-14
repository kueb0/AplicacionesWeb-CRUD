import React from "react";
import Constancia from "./Constancia";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";

class ProductoAgregar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            products: {
                "idProducto": "",
                "nombre": "",
                "precio": "",
                "descripcion": "",
                "imagen": ""
            },
        };

        this.manejarCambio = this.manejarCambio.bind(this);
        this.manejarEnvioFormulario = this.manejarEnvioFormulario.bind(this);
    }

    render() {
        return (
            <div className = "column">
                <div className = "col-md-6 offset-md-3">
                    <div className = "card card-body" style = {{width: "1300px"}}>
                        <h1 className = "is-size-3"> Agregar producto </h1>
                        <br/>
                        <form className = "field" onSubmit = {this.manejarEnvioFormulario}>
                            <div className = "form-group" style = {{display: "block"}}>
                                <div style = {{display: "inline-block", float: "left", marginRight: "20px"}}>
                                    <label className = "label" htmlFor = "idProducto" style = {{color: "red", fontSize: "18px"}}> IDProducto </label> 
                                </div>
                                <div style = {{display: "grid", width: "auto"}}>
                                    <input autoFocus required placeholder = "ID" type = "number" id = "idProducto" onChange = {this.manejarCambio} value = {this.state.products.idProducto} className = "input form-control"></input>
                                </div>
                            </div>
                            <br/>
                            <div className = "form-group" style = {{display: "block"}}>
                                <div style = {{display: "inline-block", float: "left", marginRight: "48px"}}>
                                    <label className = "label" htmlFor = "nombre" style = {{color: "red", fontSize: "18px"}}> Nombre </label>
                                </div>
                                <div style = {{display: "grid", width: "auto"}}>
                                    <input autoFocus required placeholder = "Nombre del producto" type = "text" id = "nombre" onChange = {this.manejarCambio} value = {this.state.products.nombre} className = "input form-control"></input>
                                </div>
                            </div>
                            <br/>
                            <div className = "form-group" style = {{display: "block"}}>
                                <div style = {{display: "inline-block", float: "left", marginRight: "65px"}}>
                                    <label className = "label" htmlFor = "precio" style = {{color: "red", fontSize: "18px"}}> Precio </label>
                                </div>
                                <div style = {{display: "grid", width: "auto"}}>
                                    <input autoFocus required placeholder = "Precio" type = "number" id = "precio" onChange = {this.manejarCambio} value = {this.state.products.precio} className = "input form-control"></input>
                                </div>
                            </div>
                            <br/>
                            <div className = "form-group" style = {{display: "block"}}>
                                <div style = {{display: "inline-block", float: "left", marginRight: "20px"}}>
                                    <label className = "label" htmlFor = "descripcion" style = {{color: "red", fontSize: "18px"}}> Descripcion </label>
                                </div>
                                <div style = {{display: "grid", width: "auto"}}>
                                    <textarea required placeholder = "Descripcion" type = "text" id = "descripcion" onChange = {this.manejarCambio} value = {this.state.products.descripcion} className = "input form-control"></textarea>
                                </div>
                            </div>
                            <br/>
                            <div className = "form-group" style = {{display: "block"}}>
                                <div style = {{display: "inline-block", float: "left", marginRight: "54px"}}>
                                    <label className = "label" htmlFor = "imagen" style = {{color: "red", fontSize: "18px"}}> Imagen </label>
                                </div>
                                <div style = {{display: "grid", width: "auto"}}>
                                    <input required placeholder = "Imagen" type = "text" id = "imagen" onChange = {this.manejarCambio} value = {this.state.products.imagen} className = "input form-control"></input>
                                </div>
                            </div>
                            <br/>
                            <div className = "form-group" style = {{margin: "auto", alignItems: "right", display: "flex"}}>
                                <button onClick = {this.manejarEnvioFormulario} className = "button is-success mt-2"> Agregar &nbsp; <FontAwesomeIcon icon = {faCheck} /> </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }

    async manejarEnvioFormulario(evento) {
        evento.preventDefault();

        const resultado = await Swal.fire({
            title: 'Agregado',
            icon: 'success',
        });
        if (!resultado.value) {
            return;
        }

        const cargaUtil = JSON.stringify(this.state.products);
        const respuesta = await fetch(`${Constancia.RUTA_API}`, {
            method: "POST",
            body: cargaUtil,
            headers: {
                "Content-Type": "application/json",
            }
        });

        const exitoso = await respuesta.json();

        if (exitoso) {
            toast('Producto guardado', {
                position: "top-left",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined
            });

            this.setState({
                products: {
                    "idProducto": "",
                    "nombre": "",
                    "precio": "",
                    "descripcion": "",
                    "imagen": ""
                }
            });
        } else {
            toast.error("Error al guardar. Intenta de nuevo");
        }
    }

    async manejarCambio(evento) {
        const clave = evento.target.id;
        let valor = evento.target.value;
        this.setState(state => {
            const updateProducto = state.products;
            if (clave !== "nombre" && clave !== "producto" && clave !== "descripcion" && clave !== "imagen") {
                valor = parseFloat(valor);
            }

            updateProducto[clave] = valor;

            return {
                products: updateProducto
            }
        });
    }
}

export default ProductoAgregar;