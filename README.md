# Ecomercy Mobile Application

A professional, production-ready e-commerce mobile application built for iOS and Android using **React Native**, **Expo**, and the modern **Expo Router**.

<p align="center">
  <img src="https://img.shields.io/badge/React_Native-0.74-blue" />
  <img src="https://img.shields.io/badge/Expo-51-black" />
  <img src="https://img.shields.io/badge/TypeScript-5.x-blue" />
  <img src="https://img.shields.io/badge/Tailwind-NativeWind-teal" />
</p>

## � Table of Contents
- [Features](#-features)
- [Prerequisites](#-prerequisites)
- [Getting Started](#-getting-started)
- [Project Architecture](#-project-architecture)
- [Technical Decisions & Trade-offs](#-technical-decisions--trade-offs)
- [Libraries & Tools](#-libraries--tools)

---

## 🚀 Features

*   **🛒 Dynamic Product Listing**: Real-time fetching of products from FakeStoreAPI with pull-to-refresh capabilities.
*   **📱 Modern UI/UX**: Premium card designs, smooth transitions, and responsive grid layouts powered by NativeWind.
*   **🛍️ Smart Cart Management**: Full cart functionality (Add, Remove, Adjust Quantity) with persistent storage.
*   **💾 Data Persistence**: Cart state is saved locally on the device, ensuring users never lose their shopping list.
*   **⚡ Type Safety**: Built entirely with TypeScript for robust and maintainable code.

---

## � Prerequisites

Before running the project, ensure you have the following installed:
*   [Node.js](https://nodejs.org/) (LTS version recommended)
*   [Git](https://git-scm.com/)
*   **Expo Go** app on your mobile device (available on App Store & Google Play)

---

## 🏁 Getting Started

Follow these steps to get the project running locally:

### 1. Clone the Repository
```bash
git clone <repository-url>
cd ecomercy-mobile
```

### 2. Install Dependencies
We use `npm` (or `yarn`/`bun`) to manage packages.
```bash
npx expo install
```

### 3. Start the Development Server
```bash
npx expo start
```
*   **For Android**: Press `a` in the terminal (requires Android Emulator) or scan the QR code with Expo Go.
*   **For iOS**: Press `i` in the terminal (requires Xcode Simulator) or scan the QR code with the Camera app.

---

## 📂 Project Architecture

The project follows a **Feature-First + Type-Based** architecture, centered around Expo Router's directory-based routing.

```
/ecomercy-mobile
│
├── app/                  # 🟢 ROUTING LAYER (The "Brain")
│   ├── _layout.tsx       # Root configuration (Providers, Navigation Stack)
│   ├── index.tsx         # Home Screen (Product Grid)
│   ├── cart.tsx          # Cart Screen
│   └── product/[id].tsx  # Dynamic Product Details Screen
│
├── components/           # 🟡 UI LAYER (The "Bricks")
│   ├── ProductItem.tsx   # Reusable Product Card
│   └── CartItem.tsx      # Cart Row Item
│
├── context/              # 🔴 STATE LAYER (The "Blood")
│   └── CartContext.tsx   # Global state for Cart logic
│
├── services/             # 🟣 DATA LAYER (The "Hands")
│   └── api.ts            # API Integration logic (Separation of concerns)
│
├── utils/                # ⚪ UTILITY LAYER (The "Tools")
│   └── storage.ts        # Helper functions for AsyncStorage
│
└── types/                # 🔵 TYPE LAYER (The "Laws")
    └── Product.ts        # TypeScript Interfaces
```

---

## � Technical Decisions & Trade-offs

### 1. Expo Router vs. React Navigation
*   **Decision**: Used **Expo Router**.
*   **Why?**: It aligns with the modern web standards (file-system based routing similar to Next.js), reduces boilerplate code, and provides automatic deep linking.
*   **Trade-off**: It's a newer paradigm which might have a slight learning curve for developers used to the imperative `Stack.Navigator` api.

### 2. NativeWind (Tailwind CSS)
*   **Decision**: Used **NativeWind**.
*   **Why?**: dramatically speeds up styling, ensures consistency via utility classes, and makes handling platform-specific styles (iOS/Android) easier.
*   **Trade-off**: Adds a build-time dependency, but the developer experience benefits outweigh the cost.

### 3. React Context vs. Redux/Zustand
*   **Decision**: Used **React Context**.
*   **Why?**: The application state (Cart) is global but manageable. Introducing Redux would be over-engineering (boilerplate heavy) for this scope.
*   **Trade-off**: Large number of updates could trigger re-renders, but for a shopping cart of <100 items, this is negligible.

### 4. AsyncStorage
*   **Decision**: Used `@react-native-async-storage/async-storage`.
*   **Why?**: Standard solution for simple key-value persistence in React Native.
*   **Trade-off**: Not as fast as `MMKV`, but perfectly adequate for persisting lightweight JSON data like a shopping cart.

---

## 🛠 Libraries & Tools

| Library | Purpose |
| :--- | :--- |
| **expo-router** | File-system based routing and navigation. |
| **nativewind** | Utility-first CSS styling framework. |
| **react-native-safe-area-context** | Handling notions and safe areas on modern devices. |
| **@react-native-async-storage** | Persisting data locally on the device. |
| **axios / fetch** | (Using built-in `fetch`) for API requests. |

---

## ✨ Future Improvements

*   [ ] Implement **Authentication** (Login/Signup).
*   [ ] Add **Search & Filter** functionality for products.
*   [ ] Integrate **Stripe** for payments.
*   [ ] Add **Unit Tests** using Jest.

---

<p align="center">
  Built with ❤️ by Reda
</p>
