import AsyncStorage from '@react-native-async-storage/async-storage';
import { CartItem } from '../types/Product';

const CART_STORAGE_KEY = '@ecomercy_cart';

/**
 * Persists the shopping cart content to local device storage.
 * Uses AsyncStorage to save data as a JSON string.
 *
 * @param {CartItem[]} cart - The array of cart items to save.
 */
export const saveCart = async (cart: CartItem[]): Promise<void> => {
    try {
        const jsonValue = JSON.stringify(cart);
        await AsyncStorage.setItem(CART_STORAGE_KEY, jsonValue);
    } catch (e) {
        console.error('Error saving cart:', e);
    }
};

/**
 * Loads the shopping cart content from local device storage.
 *
 * @returns {Promise<CartItem[] | null>} The array of cart items or null if nothing is saved.
 */
export const loadCart = async (): Promise<CartItem[] | null> => {
    try {
        const jsonValue = await AsyncStorage.getItem(CART_STORAGE_KEY);
        return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
        console.error('Error loading cart:', e);
        return null;
    }
};
