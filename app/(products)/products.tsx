import React, { useState, useEffect } from "react";
import { View, ScrollView, Text, TouchableOpacity, TextInput, ActivityIndicator, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { SortButton } from "@/components/products/SortButton";
import { HeaderSection } from "@/components/products/HeaderSection";
import useProducts from "@/hooks/useProducts";

interface Stock {
  id: number;
  name: string;
  quantity: number;
}

interface Product {
  id: string;
  name: string;
  price: number;
  supplier: string;
  type: string;
  image: string;
  stocks: Stock[];
}

const ProductsScreen = () => {
  // Move all hooks to the top level
  const { products = [], isLoading, error } = useProducts();
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const getTotalQuantity = (product: Product) =>
    product.stocks?.reduce((sum, stock) => sum + stock.quantity, 0) || 0;

  const handleSort = (value: string) => {
    if (sortBy === value) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(value);
      setSortOrder("asc");
    }
  };

  const handleAddProduct = () => {
    router.push("/(products)/new");
  };

  const filteredAndSortedProducts = () => {
    if (!products) return [];
    
    return products
      .filter((product) => {
        const query = searchQuery.toLowerCase();
        return (
          product.name.toLowerCase().includes(query) ||
          product.supplier.toLowerCase().includes(query) ||
          product.type.toLowerCase().includes(query) ||
          product.price.toString().includes(query)
        );
      })
      .sort((a, b) => {
        if (sortBy === "price") {
          return sortOrder === "asc" ? a.price - b.price : b.price - a.price;
        }
        if (sortBy === "name") {
          const compare = a.name.localeCompare(b.name);
          return sortOrder === "asc" ? compare : -compare;
        }
        if (sortBy === "quantity") {
          const diff = getTotalQuantity(a) - getTotalQuantity(b);
          return sortOrder === "asc" ? diff : -diff;
        }
        return 0;
      });
  };

  return (
    <LinearGradient colors={["#4F46E5", "#7C3AED"]} style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView style={{ flex: 1 }}>
          {/* Header */}
          <HeaderSection 
            title="Products"
            showAddButton
            onAddPress={handleAddProduct}
          />

          {/* Sort Options */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ paddingHorizontal: 24 }}>
            <SortButton 
              title="Name" 
              value="name" 
              currentSort={sortBy} 
              currentOrder={sortOrder} 
              onSort={handleSort} 
            />
            <SortButton 
              title="Price" 
              value="price" 
              currentSort={sortBy} 
              currentOrder={sortOrder} 
              onSort={handleSort} 
            />
            <SortButton 
              title="Quantity" 
              value="quantity" 
              currentSort={sortBy} 
              currentOrder={sortOrder} 
              onSort={handleSort} 
            />
          </ScrollView>

          {/* Products List */}
          <View style={{ padding: 24 }}>
            {isLoading ? (
              <ActivityIndicator size="large" color="white" />
            ) : error ? (
              <Text style={{ color: "white", textAlign: "center" }}>
                {error instanceof Error ? error.message : "An error occurred"}
              </Text>
            ) : (
              filteredAndSortedProducts().map((product, index) => {
                const totalQty = getTotalQuantity(product);
                return (
                  <TouchableOpacity
                    key={String(product.id) + index}
                    onPress={() => router.push(`/(products)/${product.id}`)}
                    style={{
                      backgroundColor: "rgba(255, 255, 255, 0.1)",
                      borderRadius: 20,
                      marginBottom: 16,
                      borderWidth: 1,
                      borderColor: "rgba(255, 255, 255, 0.2)",
                    }}
                  >
                    <View style={{ padding: 20, flexDirection: "row", alignItems: "center" }}>
                      <Image
                        source={{ uri: product.image }}
                        style={{
                          width: 60,
                          height: 60,
                          borderRadius: 12,
                          backgroundColor: "rgba(99, 102, 241, 0.2)",
                        }}
                      />
                      <View style={{ marginLeft: 16, flex: 1 }}>
                        <Text style={{ color: "white", fontSize: 18, fontWeight: "600", marginBottom: 4 }}>
                          {product.name}
                        </Text>
                        <Text style={{ color: "#E0E7FF", fontSize: 14 }}>
                          ${product.price} - Quantity: {totalQty}
                        </Text>
                      </View>
                      <MaterialIcons name="chevron-right" size={24} color="#E0E7FF" />
                    </View>
                  </TouchableOpacity>
                );
              })
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default ProductsScreen;