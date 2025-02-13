import React, { useState, useEffect } from "react";
import { View, Text, ActivityIndicator, Alert, StyleSheet } from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import { router } from "expo-router";
import useProducts from "@/hooks/useProducts";

const ScannerScreen = () => {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState(false);
  const { products, isLoading } = useProducts();
  const [permission, requestPermission] = useCameraPermissions();

  // Request camera permissions
  useEffect(() => {
    (async () => {
      if (!permission) {
        // If permission is not yet requested, request it
        const { status } = await requestPermission();
        setHasPermission(status === "granted");
      } else if (!permission.granted) {
        // If permission is denied, set hasPermission to false
        setHasPermission(false);
      } else {
        // If permission is already granted, set hasPermission to true
        setHasPermission(true);
      }
    })();
  }, [permission]);

  // Handle barcode scan
  const handleBarCodeScanned = ({ type, data }: { type: string; data: string }) => {
    setScanned(true); // Prevent multiple scans
    const product = products.find((p) => p.barcode === data);

    if (product) {
      Alert.alert(
        "Product Found",
        `Do you want to update the quantity of ${product.name}?`,
        [
          {
            text: "Increase Quantity",
            onPress: () => handleQuantityUpdate(product.id, 1),
          },
          {
            text: "Decrease Quantity",
            onPress: () => handleQuantityUpdate(product.id, -1),
          },
          {
            text: "Cancel",
            style: "cancel",
            onPress: () => setScanned(false),
          },
        ]
      );
    } else {
      router.push({
        pathname: "/(products)/new",
        params: { barcode: data },
      });
    }
  };

  const handleQuantityUpdate = async (productId: string, quantityChange: number) => {
    try {
      // await updateProductQuantity({ productId, quantityChange });
      Alert.alert("Success", "Product quantity updated successfully!");
    } catch (error) {
      Alert.alert("Error", "Failed to update product quantity.");
    } finally {
      setScanned(false);
    }
  };

  // Debugging: Log permission state
  console.log("Camera Permission:", hasPermission);

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
      {scanned && (
        <View style={styles.scanOverlay}>
          <Text style={styles.scanText}>Scanned!</Text>
        </View>
      )}
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
  scanOverlay: {
    position: "absolute",
    bottom: 20,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    padding: 10,
    borderRadius: 5,
  },
  scanText: {
    color: "white",
    fontSize: 16,
  },
});

export default ScannerScreen;