import React from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert } from 'react-native';
import { useCart } from '../context/CartContext';
import CartItem from '../components/CartItem';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets, SafeAreaView } from 'react-native-safe-area-context';
import { Link, useRouter } from 'expo-router';

/**
CartScreen
 *
  Displays the list of items currently in the shopping cart.
  Allows users to:
  View total price
  Adjust quantities
  Remove items
  Proceed to checkout (Simulated)
 */
export default function CartScreen() {
    const {
        cartItems,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
        totalPrice,
        clearCart,
    } = useCart();
    const insets = useSafeAreaInsets();
    const router = useRouter();

    /**
      Handles the checkout process.
      Displays a confirmation alert and clears the cart on success.
     */
    const handleCheckout = () => {
        Alert.alert(
            'Checkout',
            `Total amount: $${totalPrice.toFixed(2)}\n\nThank you for your purchase!`,
            [
                {
                    text: 'OK',
                    onPress: () => {
                        clearCart();
                        router.back();
                    },
                },
            ]
        );
    };

    // Render Empty State if no items
    if (cartItems.length === 0) {
        return (
            <View className="flex-1 justify-center items-center bg-gray-50 p-6">
                <Ionicons name="cart-outline" size={80} color="#D1D5DB" />
                <Text className="text-xl font-bold text-gray-800 mt-4">Your cart is empty</Text>
                <Text className="text-red-600 text-center mt-2 mb-8 text-sm">
                    Looks like you haven't added any items to your cart yet.
                </Text>
                <Link href="/" asChild>
                    <TouchableOpacity className="bg-blue-600 px-6 py-3 rounded-full">
                        <Text className="text-white font-bold text-sm">Start Shopping</Text>
                    </TouchableOpacity>
                </Link>
            </View>
        );
    }

    return (
        <SafeAreaView className="flex-1 bg-gray-50" edges={['bottom', 'left', 'right']}>
            <FlatList
                data={cartItems}
                renderItem={({ item }) => (
                    <CartItem
                        item={item}
                        onIncrease={() => increaseQuantity(item.id)}
                        onDecrease={() => decreaseQuantity(item.id)}
                        onRemove={() => removeFromCart(item.id)}
                    />
                )}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={{ padding: 16, paddingBottom: 120 }}
                showsVerticalScrollIndicator={false}
            />

            {/* Sticky Checkout Footer */}
            <View className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-4 shadow-lg">
                <View className="flex-row justify-between items-center mb-4">
                    <Text className="text-gray-500 text-lg">Total:</Text>
                    <Text className="text-2xl font-bold text-gray-900">
                        ${totalPrice.toFixed(2)}
                    </Text>
                </View>
                <TouchableOpacity
                    onPress={handleCheckout}
                    className="bg-blue-600 py-4 rounded-xl items-center"
                >
                    <Text className="text-white font-bold text-lg">Checkout</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}
