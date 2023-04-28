import Product from '../models/product.js';


export const getAllProducts = async (req, res) => {
    try {
        const products = await Product.findAll();

        res.status(200).json({ products });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

export const getProduct = async (req, res) => {
    try {
        const products = await Product.findOne({ where: { id: id } });

        res.status(200).json({ products });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const createProduct = async (req, res) => {

    const { name, description, price, quantity, imageUrl } = req.body;
    if (!name || !description || !price || !quantity || !imageUrl) { return res.status(400).json({ message: 'There is field EMPTY :(' }) }

    try {
        const existingProduct = await Product.findOne({ where: { name: name } });
        if (existingProduct) { return res.status(400).json({ message: 'Product already exists' }) }
        const product = await Product.create({ name, description, price, quantity, imageUrl });
        res.json({ product })
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

export const updataProduct = async (req, res) => {
    const { id } = req.params;
    const { name, description, price, quantity, imageUrl } = req.body;

    try {
        const product = await Product.findByPk(id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        // update the user's data
        product.name = name || product.name;
        product.description = description || product.description;
        product.price = price || product.price;
        product.quantity = quantity || product.quantity;
        product.imageUrl = imageUrl || product.imageUrl;


        await product.save();
        res.json(product);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

export const deleteProduct = async (req, res) => {
    const { id } = req.params;

    try {
        const product = await Product.findByPk(id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        await product.destroy();
        res.json({ message: 'Product deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};
