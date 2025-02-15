import React, { useState } from "react";
import { View, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import { PaginationControls } from "@/components/products/PaginationControls";

import { filterProducts, sortProducts } from "@/utils/productUtils";
import { HeaderSection } from "@/components/products/HeaderSection";
import { ProductList } from "@/components/products/ProductList";
import { SortButton } from "@/components/products/SortButton";
import { SearchBar } from "@/components/products/SearchBar";
import { usePagination } from "@/hooks/usePagination";
import useProducts from "@/hooks/useProducts";
import { router } from "expo-router";

export default function ProductsScreen() {
  const { products = [], isLoading, error } = useProducts();
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const clearSearch = () => setSearchQuery("");

  // Filter and sort outside the pagination
  const filtered = filterProducts(products, searchQuery);
  const sorted = sortProducts(filtered, sortBy, sortOrder);

  const { 
    page,
    totalPages,
    currentItems,
    handleNextPage,
    handlePrevPage,
    resetPage
  } = usePagination(sorted, 4);

  // If the sorting changes, reset to page 1
  const handleSort = (value: string) => {
    if (sortBy === value) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(value);
      setSortOrder("asc");
    }
    resetPage();
  };

  return (
    <LinearGradient colors={["#4F46E5", "#7C3AED"]} style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView style={{ flex: 1 }}>
          <HeaderSection
            title="Products"
            showAddButton
            onAddPress={() => router.push("/(products)/new")}
          />

          {/* SearchBar */}
          <SearchBar query={searchQuery} onChangeText={setSearchQuery} onClear={clearSearch} />

          {/* Sort Controls */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ paddingHorizontal: 24 }}>
            <SortButton title="Name" value="name" currentSort={sortBy} currentOrder={sortOrder} onSort={handleSort} />
            <SortButton title="Price" value="price" currentSort={sortBy} currentOrder={sortOrder} onSort={handleSort} />
            <SortButton title="Quantity" value="quantity" currentSort={sortBy} currentOrder={sortOrder} onSort={handleSort} />
          </ScrollView>

          {/* Product List + Pagination */}
          <View style={{ padding: 24 }}>
            <ProductList products={currentItems} error={error} isLoading={isLoading} />
            <PaginationControls
              page={page}
              totalPages={totalPages}
              onNext={handleNextPage}
              onPrev={handlePrevPage}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}