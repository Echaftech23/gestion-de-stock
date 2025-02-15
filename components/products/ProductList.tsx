
import React from "react";
import { Text, ActivityIndicator } from "react-native";
import { ProductCard } from "@/components/products/ProductCard";

export function ProductList({ products, error, isLoading }) {
  if (isLoading) {
    return <ActivityIndicator size="large" color="white" />;
  }

  if (error) {
    return (
      <Text style={{ color: "white", textAlign: "center" }}>
        {error instanceof Error ? error.message : "An error occurred"}
      </Text>
    );
  }

  return (
    <>
      {products.map((product, idx) => (
        <ProductCard key={`${product.id}-${idx}`} product={product} />
      ))}
    </>
  );
}