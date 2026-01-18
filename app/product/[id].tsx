import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    Image,
    ScrollView,
    TouchableOpacity,
    ActivityIndicator,
    Alert,
} from 'react-native';
import { useLocalSearchParams, Stack, useRouter } from 'expo-router';
import { Product } from '../../types/Product';
import { getProductById } from '../../services/api';
import { useCart } from '../../context/CartContext';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

/**
ProductDetailScreen
Displays detailed information about a specific product.
Fetches data based on the dynamic route parameter [id].
 */
export default function ProductDetailScreen() {
    const { id } = useLocalSearchParams();
    const router = useRouter();
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const { addToCart } = useCart();
    const insets = useSafeAreaInsets();

    // Fetch product details on mount or when ID changes
    useEffect(() => {
        const fetchProduct = async () => {
            if (typeof id !== 'string') return;
            try {
                const data = await getProductById(id);
                setProduct(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id]);

    const handleAddToCart = () => {
        if (product) {
            addToCart(product);
            Alert.alert('Success', 'Added to cart!');
        }
    };

    if (loading) {
        return (
            <View className="flex-1 justify-center items-center bg-white">
                <ActivityIndicator size="large" color="#2563EB" />
            </View>
        );
    }

    if (!product) {
        return (
            <View className="flex-1 justify-center items-center bg-white">
                <Text className="text-gray-500">Product not found</Text>
            </View>
        );
    }

    return (
        <>
            <Stack.Screen
                options={{
                    title: '',
                    headerLeft: () => (
                        <TouchableOpacity
                            onPress={() => {
                                if (router.canGoBack()) {
                                    router.back();
                                } else {
                                    router.replace('/');
                                }
                            }}
                            style={{ marginRight: 10 }}
                        >
                            <Ionicons name="arrow-back" size={24} color="#000" />
                        </TouchableOpacity>
                    ),
                }}
            />

            <ScrollView className="flex-1 bg-white" showsVerticalScrollIndicator={false}>
                <Image
                    source={{ uri: product.image }}
                    className="w-full h-80 object-contain bg-white mt-24"
                    resizeMode="contain"
                />
                <View className="p-6">
                    {/* Header Section */}
                    <View className="flex-row justify-between items-start mb-4">
                        <Text className="flex-1 text-2xl font-bold text-gray-900 mr-4">
                            {product.title}
                        </Text>
                        <Text className="text-2xl font-bold text-blue-600">
                            ${product.price.toFixed(2)}
                        </Text>
                    </View>

                    {/* Category Badge */}
                    <Text className="text-sm font-medium text-gray-500 bg-gray-100 self-start px-3 py-1 rounded-full mb-4 capitalize">
                        {product.category}
                    </Text>

                    {/* Rating Section */}
                    <View className="flex-row items-center mb-6">
                        <Ionicons name="star" size={20} color="#FBBF24" />
                        <Text className="ml-1 text-gray-700 font-medium">
                            {product.rating.rate} ({product.rating.count} reviews)
                        </Text>
                    </View>

                    {/* Description */}
                    <Text className="text-gray-600 text-base leading-7 mb-8">
                        {product.description}
                    </Text>
                </View>
            </ScrollView>

            {/* Sticky "Add to Cart" Footer */}
            <View
                className="p-4 bg-white border-t border-gray-100 shadow-lg"
                style={{ paddingBottom: Math.max(insets.bottom, 16) }}
            >
                <TouchableOpacity
                    onPress={handleAddToCart}
                    className="bg-blue-600 py-4 rounded-xl flex-row justify-center items-center"
                >
                    <Ionicons name="cart" size={24} color="#fff" />
                    <Text className="text-white font-bold text-lg ml-2">Add to Cart</Text>
                </TouchableOpacity>
            </View>
        </>
    );
}
