import React from "react";
import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ScrollView,
  TextInput,
} from "react-native";

const QuantityModal = ({
  modalVisible,
  closeModal,
  selectedProduct,
  quantity,
  onQuantityChange,
  handleDecrement,
  handleIncrement,
  handleQuantityUpdate,
  selectedStock,
  onStockSelect,
}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={closeModal}
    >
      <TouchableWithoutFeedback onPress={closeModal}>
        <View style={styles.modalOverlay}>
          <TouchableWithoutFeedback onPress={(e) => e.stopPropagation()}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Update Product Quantity</Text>
              <Text style={styles.productName}>{selectedProduct?.name}</Text>

              {/* Stock Selection Section */}
              <View style={styles.stockSelector}>
                <Text style={styles.sectionTitle}>Select Stock Location:</Text>
                <ScrollView style={styles.stockList}>
                  {selectedProduct?.stocks.map((stock) => (
                    <TouchableOpacity
                      key={stock.id}
                      style={[
                        styles.stockItem,
                        selectedStock?.id === stock.id && styles.selectedStockItem,
                      ]}
                      onPress={() => onStockSelect(stock)}
                    >
                      <View>
                        <Text
                          style={[
                            styles.stockName,
                            selectedStock?.id === stock.id && styles.selectedStockText,
                          ]}
                        >
                          {stock.name}
                        </Text>
                        <Text style={styles.stockDetails}>
                          {stock.localisation.city} • Current: {stock.quantity}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>

              {selectedStock ? (
                <>
                  <View style={styles.quantityContainer}>
                    <TextInput
                        style={styles.input}
                        keyboardType="numeric"
                        value={quantity.toString()}
                        onChangeText={(value) => onQuantityChange(Number(value))}
                    />
                    <View style={{ flexShrink: 0 }}>
                        <TouchableOpacity
                        style={styles.quantityButton}
                        onPress={handleDecrement}
                        >
                        <Text style={styles.quantityButtonText}>-</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                        style={styles.quantityButton}
                        onPress={handleIncrement}
                        >
                        <Text style={styles.quantityButtonText}>+</Text>
                        </TouchableOpacity>
                    </View>
                  </View>

                  <View style={styles.buttonContainer}>
                    <TouchableOpacity
                      style={[styles.button, styles.cancelButton]}
                      onPress={closeModal}
                    >
                      <Text style={styles.buttonText}>Cancel</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={[styles.button, styles.submitButton]}
                      onPress={handleQuantityUpdate}
                    >
                      <Text style={styles.buttonText}>Submit</Text>
                    </TouchableOpacity>
                  </View>
                </>
              ) : (
                <Text style={styles.selectStockPrompt}>
                  Please select a stock location to continue
                </Text>
              )}
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    width: "90%",
    maxHeight: "80%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  productName: {
    fontSize: 16,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 10,
    alignSelf: "flex-start",
  },
  stockSelector: {
    width: "100%",
    marginBottom: 20,
  },
  stockList: {
    maxHeight: 200,
    width: "100%",
  },
  stockItem: {
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
    backgroundColor: "#f5f5f5",
  },
  selectedStockItem: {
    backgroundColor: "#e3f2fd",
    borderColor: "#2196f3",
    borderWidth: 1,
  },
  stockName: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 4,
  },
  selectedStockText: {
    color: "#2196f3",
  },
  stockDetails: {
    fontSize: 14,
    color: "#666",
  },
  selectStockPrompt: {
    color: "#666",
    marginTop: 10,
    fontStyle: "italic",
  },
  input: {
    height: 50,
    width: "100%",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
    fontSize: 16,
    backgroundColor: "white",
  },
  quantityContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  quantityButton: {
    backgroundColor: "#f0f0f0",
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  quantityButtonText: {
    fontSize: 24,
    fontWeight: "bold",
  },
  quantityText: {
    fontSize: 20,
    marginHorizontal: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  button: {
    padding: 10,
    borderRadius: 10,
    minWidth: 100,
    alignItems: "center",
  },
  cancelButton: {
    backgroundColor: "#ff4444",
    marginRight: 10,
  },
  submitButton: {
    backgroundColor: "#00C851",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default QuantityModal;
