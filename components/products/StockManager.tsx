import React, { useContext } from "react";
import { ProductContext } from "../../../contexts/ProductContext";

const StockManager: React.FC = () => {
  const { products, updateStock } = useContext(ProductContext);

  const handleStockChange = (productId: string, newStock: number) => {
    updateStock(productId, newStock);
  };

  return (
    <div>
      <h2>Stock Manager</h2>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <span>{product.name}</span>
            <input
              type="number"
              value={product.stock}
              onChange={(e) =>
                handleStockChange(product.id, Number(e.target.value))
              }
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StockManager;
