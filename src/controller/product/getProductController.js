const axios = require('axios');

async function getProduct(req, res) {
    const {id} = req.params;
    try {
        const response = await axios.get(`https://api.mercadolibre.com/items/${id}`);
        const responseDescription =
            await axios.get(`https://api.mercadolibre.com/items/${id}/description`);
        let result = {
            author: {
                name: 'Luis David',
                lastName: 'Gonzalez Martinez',
            },
            item: {
                id: response.data.id,
                title: response.data.title,
                price: {
                    currency: response.data.currency_id,
                    amount: response.data.price,
                    decimals: 2,
                },
                picture: response.data.thumbnail,
                condition: response.data.condition,
                free_shipping: response.data.shipping.free_shipping,
                sold_quantity: response.data.sold_quantity,
                description: responseDescription.data.plain_text,
            }
        }
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ message: error });
    }
}

module.exports = {
    getProduct,
};
