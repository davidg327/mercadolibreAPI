const axios = require('axios');
const {searchProduct} = require('../controller/product/searchProductController');

jest.mock('axios');

describe('searchProduct', () => {
    it('return products when result of search is valid with categories', async () => {
        const mockReq = {
            query: { q: 'iphone' },
        };
        const mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        axios.get.mockResolvedValueOnce({
            data: {
                results: [
                    {
                        id: 'MLA123456',
                        title: 'iPhone XR',
                        currency_id: 'ARS',
                        price: 100,
                        thumbnail: 'https://example.com/iphone.jpg',
                        condition: 'new',
                        shipping: { free_shipping: true },
                    },
                ],
                filters: [
                    {
                        name: 'Categorías',
                        values: [
                            {
                                path_from_root: [
                                    { name: 'Celulares y Smartphones' },
                                    { name: 'Celulares y Teléfonos' },
                                ],
                            },
                        ],
                    },
                ],
            },
        })

        await searchProduct(mockReq, mockRes);

        expect(mockRes.status).toHaveBeenCalledWith(201);
        expect(mockRes.json).toHaveBeenCalledWith(expect.objectContaining({
            author: {
                name: expect.any(String),
                lastName: expect.any(String),
            },
            categories: expect.objectContaining([expect.any(String)]),
            items: expect.arrayContaining([
                    expect.objectContaining({
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
                    })
                ]
            ),
        }));
    });
    it('return products when result of search is valid without categories', async () => {
        const mockReq = {
            query: { q: 'iphone' },
        };
        const mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        axios.get.mockResolvedValueOnce({
            data: {
                results: [
                    {
                        id: 'MLA123456',
                        title: 'iPhone XR',
                        currency_id: 'ARS',
                        price: 100,
                        thumbnail: 'https://example.com/iphone.jpg',
                        condition: 'new',
                        shipping: { free_shipping: true },
                    },
                ],
                filters: [],
            },
        })

        await searchProduct(mockReq, mockRes);

        expect(mockRes.status).toHaveBeenCalledWith(201);
        expect(mockRes.json).toHaveBeenCalledWith(expect.objectContaining({
            author: {
                name: expect.any(String),
                lastName: expect.any(String),
            },
            categories: [],
            items: expect.arrayContaining([
                    expect.objectContaining({
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
                    })
                ]
            ),
        }));
    });
});
