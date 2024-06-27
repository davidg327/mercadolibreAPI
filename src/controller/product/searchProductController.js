const axios = require('axios');

async function searchProduct(req, res) {
    const {q: query} = req.query;
    try {
        const response =
            await axios.get(`https://api.mercadolibre.com/sites/MLA/search?q=${query}`);
        const newData = response.data.results.slice(0,4);
        const onlyCategories = response.data.filters.filter(categories => categories.name === 'Categorías');
        const categories = onlyCategories.length > 0 ?
            onlyCategories[0].values.flatMap(categories => categories.path_from_root.map(category => category.name)) :
            [];
        const items = newData.length > 0 ? newData.map((item) => {
            return {
                id: item.id,
                title: item.title,
                price: {
                    currency: item.currency_id,
                    amount: item.price,
                    decimals: 2,
                },
                picture: item.thumbnail,
                condition: item.condition,
                free_shipping: item.shipping.free_shipping,
            }
        }) : [];
        const result = {
            author: {
                name: 'Luis David',
                lastName: 'Gonzalez Martinez',
            },
            categories: categories,
            items: items,
        };
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ message: error });
    }
}

module.exports = {
    searchProduct,
};
