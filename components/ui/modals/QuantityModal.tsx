import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface QuantityModalProps {
  modalVisible: boolean;
  closeModal: () => void;
  selectedProduct: any;
  selectedStock: any;
  onStockSelect: (stock: any) => void;
  quantity: number;
  handleDecrement: () => void;
  handleIncrement: () => void;
  handleQuantityUpdate: () => void;
}

const QuantityModal: React.FC<QuantityModalProps> = ({
  modalVisible,
  closeModal,
  selectedProduct,
  selectedStock,
  onStockSelect,
  quantity,
  handleDecrement,
  handleIncrement,
  handleQuantityUpdate,
}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={closeModal}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalTitle}>{selectedProduct?.name}</Text>
          
          {/* Stock Selection */}
          {selectedProduct?.stocks.map((stock: any) => (
            <TouchableOpacity
              key={stock.id}
              style={[
                styles.stockItem,
                selectedStock?.id === stock.id && styles.selectedStock
              ]}
              onPress={() => onStockSelect(stock)}
            >
              <Text style={styles.stockText}>
                {stock.name} - Current: {stock.quantity}
              </Text>
            </TouchableOpacity>
          ))}

          {/* Quantity Controls */}
          {selectedStock && (
            <View style={styles.quantityContainer}>
              <TouchableOpacity onPress={handleDecrement} style={styles.quantityButton}>
                <Text style={styles.quantityButtonText}>-</Text>
              </TouchableOpacity>
              
              <Text style={styles.quantityText}>{quantity}</Text>
              
              <TouchableOpacity onPress={handleIncrement} style={styles.quantityButton}>
                <Text style={styles.quantityButtonText}>+</Text>
              </TouchableOpacity>
            </View>
          )}

          {/* Action Buttons */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, styles.buttonCancel]}
              onPress={closeModal}
            >
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[styles.button, styles.buttonUpdate]}
              onPress={handleQuantityUpdate}
              disabled={!selectedStock}
            >
              <Text style={styles.buttonText}>Update</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  stockItem: {
    padding: 10,
    marginVertical: 5,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
  },
  selectedStock: {
    backgroundColor: '#4F46E5',
  },
  stockText: {
    fontSize: 16,
    color: '#333',
  },
  quantityContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  quantityButton: {
    width: 40,
    height: 40,
    backgroundColor: '#4F46E5',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityButtonText: {
    color: 'white',
    fontSize: 24,
  },
  quantityText: {
    fontSize: 20,
    marginHorizontal: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    minWidth: 100,
  },
  buttonCancel: {
    backgroundColor: '#ef4444',
  },
  buttonUpdate: {
    backgroundColor: '#4F46E5',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default QuantityModal;