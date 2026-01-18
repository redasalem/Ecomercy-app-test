import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { CartItem, Product } from '../types/Product';
import { saveCart, loadCart } from '../utils/storage';

interface CartContextType {
    cartItems: CartItem[];
    addToCart: (product: Product) => void;
    removeFromCart: (productId: number) => void;
    increaseQuantity: (productId: number) => void;
    decreaseQuantity: (productId: number) => void;
    clearCart: () => void;
    totalPrice: number;
    isLoadingStorage: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

/**
 * CartProvider
 *
 * Wraps the application to provide global cart state management.
 * Handles:
 * - Adding/Removing items
 * - Quantity adjustments
 * - Persistence to AsyncStorage
 * - Total price calculation
 */
export const CartProvider = ({ children }: { children: ReactNode }) => {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [isLoadingStorage, setIsLoadingStorage] = useState(true);

    // Initial Load: Retrieve cart from local storage on app mount
    useEffect(() => {
        const initCart = async () => {
            const storedCart = await loadCart();
            if (storedCart) {
                setCartItems(storedCart);
            }
            setIsLoadingStorage(false);
        };
        initCart();
    }, []);

    // Persistence: Save cart to local storage whenever it changes
    // We skip saving if we are still loading the initial state to avoid overwriting with empty array
    useEffect(() => {
        if (!isLoadingStorage) {
            saveCart(cartItems);
        }
    }, [cartItems, isLoadingStorage]);

    /**
     * Adds a product to the cart.
     * If product exists, increments quantity. Otherwise, adds new item with quantity 1.
     */
    const addToCart = (product: Product) => {
        setCartItems((prevItems) => {
            const existingItem = prevItems.find((item) => item.id === product.id);
            if (existingItem) {
                return prevItems.map((item) =>
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            }
            return [...prevItems, { ...product, quantity: 1 }];
        });
    };

    /**
     * Removes a product completely from the cart.
     */
    const removeFromCart = (productId: number) => {
        setCartItems((prevItems) => prevItems.filter((item) => item.id !== productId));
    };

    /**
     * Increments the quantity of a specific product in the cart.
     */
    const increaseQuantity = (productId: number) => {
        setCartItems((prevItems) =>
            prevItems.map((item) =>
                item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
            )
        );
    };

    /**
     * Decrements the quantity of a specific product.
     * If quantity reaches 0, the item remains (logic can be changed to remove it).
     * Current logic ensures quantity stays > 0.
     */
    const decreaseQuantity = (productId: number) => {
        setCartItems((prevItems) =>
            prevItems
                .map((item) =>
                    item.id === productId ? { ...item, quantity: item.quantity - 1 } : item
                )
                .filter((item) => item.quantity > 0)
        );
    };

    const clearCart = () => {
        setCartItems([]);
    };

    // Calculate total price dynamically
    const totalPrice = cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    return (
        <CartContext.Provider
            value={{
                cartItems,
                addToCart,
                removeFromCart,
                increaseQuantity,
                decreaseQuantity,
                clearCart,
                totalPrice,
                isLoadingStorage,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

/**
 * Custom hook to use the CartContext.
 * Ensures the hook is used within a CartProvider.
 */
export const useCart = () => {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};
