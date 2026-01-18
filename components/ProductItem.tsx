import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Product } from '../types/Product';
import { Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

interface ProductItemProps {
    product: Product;
}

/**
 * ProductItem Component
 *
 * Renders a single product card in the product list.
 * Features a detailed design with image, price, title, and "Add" button.
 *
 * @param {Product} product - The product data to display.
 */
const ProductItem: React.FC<ProductItemProps> = ({ product }) => {
    return (
        <Link href={`/product/${product.id}`} asChild>
            <TouchableOpacity
                className="bg-white rounded-3xl mb-6 shadow-sm border border-gray-100 overflow-hidden"
                style={{ elevation: 3 }}
                activeOpacity={0.9}
            >
                {/* Image & Category Container */}
                <View className="h-56 bg-white p-6 items-center justify-center relative">
                    {/* Category Category Badge */}
                    <View className="absolute top-2 left-1 bg-blue-600 px-1 py-[5px] rounded-full z-10">
                        <Text className="text-xs font-bold text-white bg-blue-600 px-2 py-1 rounded-full uppercase tracking-wider">
                            {product.category}
                        </Text>
                    </View>

                    <Image
                        source={{ uri: product.image }}
                        className="w-full h-full object-contain"
                        resizeMode="contain"
                    />
                </View>

                {/* Details Container */}
                <View className="p-5 bg-white border-t border-gray-100">
                    <View className="flex-row justify-between items-start mb-2">
                        <Text
                            className="text-gray-900 font-bold text-lg flex-1 mr-4"
                            numberOfLines={2}
                        >
                            {product.title}
                        </Text>
                        <View className="flex-row items-center space-x-1">
                            <Ionicons name="star" size={16} color="#FBBF24" />
                            <Text className="text-gray-600 font-bold text-sm">
                                {product.rating.rate}
                            </Text>
                        </View>
                    </View>

                    {/* Price & Action */}
                    <View className="flex-row items-center justify-between mt-3">
                        <Text className="text-2xl font-extrabold text-blue-600">
                            ${product.price.toFixed(2)}
                        </Text>

                        <TouchableOpacity className="bg-gray-900 px-5 py-2.5 rounded-full flex-row items-center">
                            <Text className="text-white font-bold text-sm mr-2">View</Text>
                            <Ionicons name="arrow-forward" size={16} color="white" />
                        </TouchableOpacity>
                    </View>
                </View>
            </TouchableOpacity>
        </Link>
    );
};

export default ProductItem;
