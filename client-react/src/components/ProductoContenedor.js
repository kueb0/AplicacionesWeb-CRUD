import React from "react";
import { toast } from "react-toastify"; 
import Swal from "sweetalert2";
import Constancia from "../components/Constancia";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

class ProductoContenedor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            eliminado: false,
        };
        this.eliminar = this.eliminar.bind(this);
    };

    async eliminar() {
        const resultado = await Swal.fire({
            title: 'Eliminado',
            icon: 'success',
        });
        if (!resultado.value) {
            return;
        }

        const respuesta = await fetch(`${Constancia.RUTA_API}/${this.props.products._id}`, {
            method: "DELETE",
        });
        
        console.log(respuesta);
        const exitoso = await respuesta.json();

        if (exitoso) {
            toast('Producto eliminado ', {
                position: "top-left",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined
            });
            this.setState({
                eliminado: true
            });
        } else {
            toast.error("Error al eliminar. Intenta de nuevo");
        }
    };

    render() {
        if (this.state.eliminado) {
            return null;
        }

        return (
            <tr>
                <td>{this.props.products.idProducto}</td>
                <td>{this.props.products.nombre}</td>
                <td>{this.props.products.precio}</td>
                <td>{this.props.products.descripcion}</td>
                <td><img src = {this.props.products.imagen}/></td>
                <td>
                    <button onClick = {this.eliminar} className = "button is-danger"> <FontAwesomeIcon icon = {faTrash} /> </button>
                </td>
            </tr>
            /*
            <div className="row">
                <div className = "col-md-7 p-2">
                    <div className = "card" style={{width: "18cm"}}>
                        <div className = "card-header">
                            <h5> {this.props.products.marca} </h5>
                        </div>
                        <div className = "card-body">
                            <p> {this.props.products.producto} </p>
                            <p> {this.props.products.precio} </p>
                            <p> {this.props.products.descripcion} </p>
                        </div>
                        <div className = "card-footer">
                            <button onClick = {this.eliminar} className = "button is-danger"> Eliminar </button>
                        </div>
                    </div>
                </div>
            </div>
            */
        );
    }
};

export default ProductoContenedor;