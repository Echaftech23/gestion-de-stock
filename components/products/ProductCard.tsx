import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";

interface Stock {
  id: number;
  quantity: number;
}

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  stocks?: Stock[];
}

interface Props {
  product: Product;
}

export function ProductCard({ product }: Props) {
  const totalQty = product.stocks?.reduce((sum, s) => sum + s.quantity, 0) || 0;

  return (
    <TouchableOpacity
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
}