interface Stock {
  id: number;
  name: string;
  quantity: number;
}

interface Product {
  id: string;
  name: string;
  price: number;
  supplier: string;
  type: string;
  image: string;
  stocks: Stock[];
}

export function filterProducts(products: Product[], searchTerm: string): Product[] {
  const query = searchTerm.toLowerCase();
  return products.filter((product) =>
    product.name.toLowerCase().includes(query) ||
    product.supplier.toLowerCase().includes(query) ||
    product.type.toLowerCase().includes(query) ||
    product.price.toString().includes(query)
  );
}

export function sortProducts(
  products: Product[],
  sortBy: string,
  sortOrder: "asc" | "desc"
): Product[] {
  const getTotalQuantity = (p: Product) =>
    p.stocks?.reduce((sum, stock) => sum + stock.quantity, 0) || 0;

  return [...products].sort((a, b) => {
    switch (sortBy) {
      case "price":
        return sortOrder === "asc" ? a.price - b.price : b.price - a.price;
      case "name": {
        const compare = a.name.localeCompare(b.name);
        return sortOrder === "asc" ? compare : -compare;
      }
      case "quantity": {
        const diff = getTotalQuantity(a) - getTotalQuantity(b);
        return sortOrder === "asc" ? diff : -diff;
      }
      default:
        return 0;
    }
  });
}