export interface Statistics {
  totalProducts: number;
  outOfStock: number;
  totalStockValue: number;
  mostAddedProducts: Array<{
    id: string;
    name: string;
    quantity: number;
  }>;
  mostRemovedProducts: Array<{
    id: string;
    name: string;
    quantity: number;
  }>;
}
