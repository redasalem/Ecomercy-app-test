import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { CartItem as CartItemType } from '../types/Product';
import { Ionicons } from '@expo/vector-icons';

interface CartItemProps {
    item: CartItemType;
    onIncrease: () => void;
    onDecrease: () => void;
    onRemove: () => void;
}

/**
 * CartItem Component
 * 
 * Displays a single item in the shopping cart with controls for quantity and removal.
 * Redesigned for a premium, clean look with improved touch targets.
 * 
 * @param {CartItemType} item - The cart item data.
 */
const CartItem: React.FC<CartItemProps> = ({ item, onIncrease, onDecrease, onRemove }) => {
    return (
        <View
            className="bg-white p-4 rounded-2xl shadow-sm mb-4 flex-row items-center border border-gray-100"
            style={{ elevation: 2 }}
        >
            {/* Product Image */}
            <View className="w-20 h-20 bg-gray-50 rounded-xl items-center justify-center p-2 mr-4">
                <Image
                    source={{ uri: item.image }}
                    className="w-full h-full object-contain"
                    resizeMode="contain"
                />
            </View>

            {/* Content Container */}
            <View className="flex-1">
                <View className="flex-row justify-between items-start">
                    <Text className="text-gray-900 font-bold text-sm mb-1 flex-1 pr-2" numberOfLines={2}>
                        {item.title}
                    </Text>
                    <TouchableOpacity onPress={onRemove} className="p-1 -mt-1 -mr-1">
                        <Ionicons name="close-circle-outline" size={22} color="#9CA3AF" />
                    </TouchableOpacity>
                </View>

                <Text className="text-gray-500 text-xs mb-3 font-medium">
                    {item.category}
                </Text>

                <View className="flex-row items-center justify-between">
                    <Text className="text-blue-600 font-extrabold text-lg">
                        ${(item.price * item.quantity).toFixed(2)}
                    </Text>

                    {/* Quantity Controls */}
                    <View className="flex-row items-center bg-gray-50 rounded-full border border-gray-100">
                        <TouchableOpacity
                            onPress={onDecrease}
                            className="w-8 h-8 items-center justify-center bg-white rounded-full shadow-sm m-0.5"
                            activeOpacity={0.7}
                        >
                            <Ionicons name="remove" size={16} color="#1F2937" />
                        </TouchableOpacity>

                        <Text className="mx-3 font-bold text-gray-900 text-sm">
                            {item.quantity}
                        </Text>

                        <TouchableOpacity
                            onPress={onIncrease}
                            className="w-8 h-8 items-center justify-center bg-blue-600 rounded-full shadow-sm m-0.5"
                            activeOpacity={0.7}
                        >
                            <Ionicons name="add" size={16} color="white" />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    );
};

export default CartItem;
