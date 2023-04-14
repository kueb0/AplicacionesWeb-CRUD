const ProductoEsquema = require('../models/producto');
const productoDatos = {};

productoDatos.getProductos = async (req, res) => {
	const products = await ProductoEsquema.find();
	res.json(products);
};

productoDatos.createProductos = async (req, res) => {
	const { idProducto, nombre, precio, descripcion, imagen } = req.body;
	const newProduct = new ProductoEsquema({
		idProducto: idProducto, 
		nombre: nombre, 
		precio: precio, 
		descripcion: descripcion,
		imagen: imagen
	});
	await newProduct.save();
	res.json({message: 'Producto guardado'});
};

productoDatos.getProducto = async (req, res) => {
	const product = await ProductoEsquema.findById(req.params.id);

	if (!product) {
		return res.status(400).json({message: 'Producto no encontrado'})
	}

	res.json(product);
};

productoDatos.deleteProducto = async (req, res) => {
	const deletedProduct = await ProductoEsquema.findByIdAndDelete(req.params.id);

	if(!deletedProduct) {
		return res.status(400).json({message: 'Producto no encontrado'})
	}

	res.json({message: 'Producto eliminado'});
};

productoDatos.updateProducto = async (req, res, next) => {
	const { idProducto, nombre, precio, descripcion, imagen } = req.body;
	await ProductoEsquema.findByIdAndUpdate(req.params.id, {
		idProducto: idProducto, 
		nombre: nombre, 
		precio: precio, 
		descripcion: descripcion,
		imagen: imagen
	});

	res.json({message: 'Producto actualizado'});
};

module.exports = productoDatos;
