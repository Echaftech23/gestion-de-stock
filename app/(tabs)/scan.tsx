import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  Alert,
} from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import { router } from "expo-router";
import useProducts from "@/hooks/useProducts";
import QuantityModal from "@/components/ui/modals/QuantityModal";

const ScannerScreen = () => {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [selectedStock, setSelectedStock] = useState<any>(null);
  const { products, updateProductQuantity } = useProducts();
  const [permission, requestPermission] = useCameraPermissions();

  useEffect(() => {
    (async () => {
      if (!permission) {
        const { status } = await requestPermission();
        setHasPermission(status === "granted");
      } else if (!permission.granted) {
        setHasPermission(false);
      } else {
        setHasPermission(true);
      }
    })();
  }, [permission]);

  const handleBarCodeScanned = ({ type, data }: { type: string; data: string }) => {
    
    console.log(`Bar code with type ${type} and data ${data} has been scanned!`);
    setScanned(true);
    console.log("Scanned data:", data);
    console.log("Products:", products);
    const product = products.find((p: { barcode: string; }) => p.barcode == data);

    console.log("Product found:", product);

    if (product) {
      setSelectedProduct(product);
      setSelectedStock(null);
      setQuantity(1);
      setModalVisible(true);
    } else {
      router.push({
        pathname: "/(products)/new",
        params: { barcode: data },
      });
    }
  };

  const handleStockSelect = (stock: any) => {
    setSelectedStock(stock);
    setQuantity(stock.quantity);
  };

  const handleQuantityUpdate = async () => {
    if (!selectedStock) return;
    
    try {
      await updateProductQuantity({
        productId: selectedProduct.id,
        stockId: selectedStock.id,
        quantityChange: quantity,
      });
      setModalVisible(false);
      setSelectedProduct(null);
      setSelectedStock(null);
      setQuantity(1);
      Alert.alert("Quantity updated successfully");
    } catch (error) {
      console.error("Failed to update quantity:", error);
    } finally {
      setScanned(false);
    }
  };

  const handleIncrement = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleDecrement = () => {
    setQuantity((prev) => Math.max(prev - 1, 0));
  };

  const closeModal = () => {
    setModalVisible(false);
    setScanned(false);
    setSelectedProduct(null);
    setSelectedStock(null);
    setQuantity(1);
  };

  if (hasPermission === null) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
        <Text>Requesting camera permission...</Text>
      </View>
    );
  }

  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <Text>No access to camera. Please enable camera permissions in settings.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CameraView
        style={styles.camera}
        facing="back"
        onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
        barcodeScannerSettings={{
          barcodeTypes: ["ean13", "upc_a"],
        }}
      />
      <QuantityModal
        modalVisible={modalVisible}
        closeModal={closeModal}
        selectedProduct={selectedProduct}
        selectedStock={selectedStock}
        onStockSelect={handleStockSelect}
        quantity={quantity}
        handleDecrement={handleDecrement}
        handleIncrement={handleIncrement}
        handleQuantityUpdate={handleQuantityUpdate}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  camera: {
    width: "100%",
    height: "100%",
  },
});

export default ScannerScreen;