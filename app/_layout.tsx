import '../global.css';
import { Stack, Link } from 'expo-router';
import { CartProvider, useCart } from '../context/CartContext';
import { TouchableOpacity, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';

const CartIcon = () => {
    const { cartItems } = useCart();
    const count = cartItems.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <Link href="/cart" asChild>
            <TouchableOpacity className="mr-4 relative">
                <Ionicons name="cart-outline" size={30} color="orange" fontWeight="bold" />
                {count > 0 && (
                    <View className="absolute -top-2 -right-2 bg-red-500 rounded-full w-5 h-5 items-center justify-center">
                        <Text className="text-white text-xs font-bold">{count}</Text>
                    </View>
                )}
            </TouchableOpacity>
        </Link>
    );
};

export default function RootLayout() {
    return (
        <CartProvider>
            <StatusBar style="auto" />
            <Stack
                screenOptions={{
                    headerStyle: {
                        backgroundColor: '#ffffff',
                    },
                    headerShadowVisible: false,
                    headerTitleStyle: {
                        fontWeight: '800',
                        fontSize: 20,
                        color: '#1F2937', // gray-900
                    },
                    headerTitleAlign: 'center',
                    headerTintColor: '#1F2937',
                    contentStyle: { backgroundColor: '#F9FAFB' }, // gray-50
                }}
            >
                <Stack.Screen
                    name="index"
                    options={{
                        title: 'ECOMERCY',
                        headerLargeTitle: true, // efficient on iOS
                        headerRight: () => <CartIcon />,
                        headerTitleStyle: {
                            fontFamily: 'serif', // Just a fallback, better if we had specific fonts
                            fontWeight: '900',
                            fontSize: 22,
                            color: '#2563EB', // blue-600
                        },
                    }}
                />
                <Stack.Screen
                    name="product/[id]"
                    options={{
                        title: '', // Remove default title for cleaner look
                        headerRight: () => <CartIcon />,
                        presentation: 'card',
                        headerTransparent: true, // Make header transparent for image blend
                        headerBlurEffect: 'light', // iOS only
                        headerBackground: () => (
                            <View className="flex-1 bg-white/80 blur-md absolute inset-0 border-b border-gray-100/50" />
                        ),
                    }}
                />
                <Stack.Screen
                    name="cart"
                    options={{
                        title: 'Cart',
                        presentation: 'modal',
                        headerLeft: () => (
                            <Link href="../" asChild>
                                <TouchableOpacity>
                                    <Ionicons className='mr-4' name="close-circle" size={24} color="#EF4444" />
                                </TouchableOpacity>
                            </Link>
                        ),
                    }}
                />
            </Stack>
        </CartProvider>
    );
}
