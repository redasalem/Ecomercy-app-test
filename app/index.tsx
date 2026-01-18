import React, { useEffect, useState, useCallback } from 'react';
import { View, FlatList, ActivityIndicator, Text, RefreshControl } from 'react-native';
import { Product } from '../types/Product';
import { getProducts } from '../services/api';
import ProductItem from '../components/ProductItem';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

/**
  ProductListScreen
  Displays a list of available products fetched from the API.
  Features:
  Loading Skeleton/Spinner
  Pull-to-refresh functionality
  Error handling with retry mechanism
 */
export default function ProductListScreen() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [refreshing, setRefreshing] = useState(false);
    const insets = useSafeAreaInsets();

    /**
      Data fetching method.
      Handles positive/negative cases for API requests.
     */
    const fetchProducts = async () => {
        try {
            setError(null);
            // If it's a pull-to-refresh action, keep previous data visible while loading?
            // For now, we rely on the refreshing prop or initial loader.
            const data = await getProducts();
            setProducts(data);
        } catch (err) {
            setError('Failed to load products. Please try again.');
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    // Initial load
    useEffect(() => {
        fetchProducts();
    }, []);

    // Refresh handler with memoization to prevent re-creation on every render
    const onRefresh = useCallback(() => {
        setRefreshing(true);
        fetchProducts();
    }, []);

    // Loading State
    if (loading) {
        return (
            <View className="flex-1 justify-center items-center bg-gray-50">
                <ActivityIndicator size="large" color="#2563EB" />
            </View>
        );
    }

    // Error State
    if (error) {
        return (
            <View className="flex-1 justify-center items-center bg-gray-50 p-4">
                <Text className="text-red-500 text-center mb-4 text-lg">{error}</Text>
                <Text className="text-blue-600 font-bold" onPress={fetchProducts}>
                    Tap to try again.
                </Text>
            </View>
        );
    }

    // Success State
    return (
        <View className="flex-1 bg-gray-50" style={{ paddingBottom: insets.bottom }}>
            <FlatList
                data={products}
                renderItem={({ item }) => <ProductItem product={item} />}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={{ padding: 16, paddingBottom: 20 }}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                        tintColor="#2563EB"
                    />
                }
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
}
