const axios = require('axios');
const {getProduct} = require('../controller/product/getProductController');

jest.mock('axios');

describe('getProduct', () => {
    it('return product details when valid id', async () => {
        const mockReq = {
            params: { id: 'MLA123456' },
        };
        const mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        axios.get.mockResolvedValueOnce({
            data: {
                id: 'MLA123456',
                title: 'Producto de prueba',
                currency_id: 'ARS',
                price: 100,
                thumbnail: 'https://example.com/image.jpg',
                condition: 'new',
                shipping: {
                    free_shipping: true
                },
                sold_quantity: 10,
            },
        })
            .mockResolvedValueOnce({
                data: {
                    plain_text: 'Descripción del producto'
                },
            });

        await getProduct(mockReq, mockRes);

        expect(mockRes.status).toHaveBeenCalledWith(201);
        expect(mockRes.json).toHaveBeenCalledWith(expect.objectContaining({
            author: {
                name: expect.any(String),
                lastName: expect.any(String),
            },
            item: expect.objectContaining({
                id: expect.any(String),
                title: expect.any(String),
                price: expect.objectContaining({
                    currency: expect.any(String),
                    amount: expect.any(Number),
                    decimals: expect.any(Number),
                }),
                picture: expect.any(String),
                condition: expect.any(String),
                free_shipping: expect.any(Boolean),
                sold_quantity: expect.any(Number),
                description: expect.any(String),
            }),
        }));
    });
});
