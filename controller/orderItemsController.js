import OrderItem from '../models/OrderItem.js';

const createOrderItems = async (req, res) => {
    try {
        const { orderItems } = req.body;

        const createdOrderItems = await OrderItem.bulkCreate(orderItems);

        res.status(201).json(createdOrderItems);
    } catch (error) {
        console.log(error);
        res.status(500).send('Error creating order items');
    }
};

export default { createOrderItems };