import Order from '../models/orders.js';
import OrderItem from '../models/orderItems.js';

export const createOrder = async (req, res) => {
    try {
        const { userId, items } = req.body;

        const order = await Order.create({ userId });

        for (let i = 0; i < items.length; i++) {
            const { name, price, quantity } = items[i];
            await OrderItem.create({
                name,
                price,
                quantity,
                orderId: order.id,
            });
        }

        res.status(201).json({ message: 'Order created successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to create order' });
    }
};
