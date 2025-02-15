import React, { useState, useEffect } from "react";
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Image,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, router } from "expo-router";
import { fetchProductById } from "@/services/products";
import { Product } from "@/types/product";


const ProductDetailsScreen = () => {
  const { id } = useLocalSearchParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getTotalQuantity = (p: Product) =>
    p.stocks?.reduce((sum, stock) => sum + stock.quantity, 0) || 0;

  useEffect(() => {
    loadProductDetails();
  }, [id]);

  const loadProductDetails = async () => {
    try {
      const data = await fetchProductById(id);
      setProduct(data);
      setError(null);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <LinearGradient colors={["#4F46E5", "#7C3AED"]} style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView style={{ flex: 1 }}>
          {/* Header with Back Button */}
          <View style={{ flexDirection: "row", alignItems: "center", padding: 24 }}>
            <TouchableOpacity
              onPress={() => router.back()}
              style={{
                padding: 8,
                borderRadius: 20,
                backgroundColor: "rgba(255, 255, 255, 0.1)",
              }}
            >
              <MaterialIcons name="arrow-back" size={24} color="white" />
            </TouchableOpacity>
            <Text
              style={{
                fontSize: 24,
                fontWeight: "bold",
                color: "white",
                marginLeft: 16,
              }}
            >
              Product Details
            </Text>
          </View>

          {loading ? (
            <ActivityIndicator size="large" color="white" />
          ) : error ? (
            <Text style={{ color: "white", textAlign: "center" }}>{error}</Text>
          ) : product ? (
            <View style={{ padding: 24 }}>
              {/* Product Image */}
              <Image
                source={{ uri: product.image }}
                style={{
                  width: "100%",
                  height: 300,
                  borderRadius: 20,
                  marginBottom: 24,
                  backgroundColor: "rgba(99, 102, 241, 0.2)",
                }}
                resizeMode="cover"
              />

              {/* Product Info */}
              <View
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                  borderRadius: 20,
                  padding: 24,
                  borderWidth: 1,
                  borderColor: "rgba(255, 255, 255, 0.2)",
                }}
              >
                <Text
                  style={{
                    fontSize: 28,
                    fontWeight: "bold",
                    color: "white",
                    marginBottom: 8,
                  }}
                >
                  {product.name}
                </Text>

                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginBottom: 16,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 24,
                      color: "white",
                      fontWeight: "600",
                    }}
                  >
                    ${product.price}
                  </Text>
                </View>

                {/* Product Details */}
                <View style={{ gap: 12 }}>
                  <DetailItem
                    icon="inventory"
                    label="In Stock"
                    value={`${getTotalQuantity(product)} units`}
                  />
                  <DetailItem icon="local-shipping" label="Supplier" value={product.supplier} />
                  <DetailItem icon="category" label="Type" value={product.type} />
                </View>
              </View>
            </View>
          ) : null}
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

const DetailItem = ({ icon, label, value }: { icon: string; label: string; value: string }) => (
  <View
    style={{
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: "rgba(255, 255, 255, 0.05)",
      padding: 16,
      borderRadius: 12,
    }}
  >
    <MaterialIcons name={icon} size={24} color="#E0E7FF" />
    <View style={{ marginLeft: 12 }}>
      <Text style={{ color: "#E0E7FF", fontSize: 14 }}>{label}</Text>
      <Text style={{ color: "white", fontSize: 16, fontWeight: "500" }}>{value}</Text>
    </View>
  </View>
);

export default ProductDetailsScreen;