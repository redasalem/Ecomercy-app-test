import { Product } from '../types/Product';

const BASE_URL = 'https://fakestoreapi.com';

/**
 * Fetches the list of all products from the external API.
 * @returns {Promise<Product[]>} A list of product objects.
 * @throws Will throw an error if the network request fails.
 */
export const getProducts = async (): Promise<Product[]> => {
    try {
        const response = await fetch(`${BASE_URL}/products`);
        if (!response.ok) {
            throw new Error('Failed to fetch products');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
    }
};

/**
 * Fetches a single product details by its ID.
 * @param {string} id - The ID of the product.
 * @returns {Promise<Product>} The product details object.
 * @throws Will throw an error if the network request fails.
 */
export const getProductById = async (id: string): Promise<Product> => {
    try {
        const response = await fetch(`${BASE_URL}/products/${id}`);
        if (!response.ok) {
            throw new Error('Failed to fetch product details');
        }
        return await response.json();
    } catch (error) {
        console.error(`Error fetching product ${id}:`, error);
        throw error;
    }
};
