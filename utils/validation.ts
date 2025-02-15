import { Product } from "@/types/product";

export function validateProductForm(formData: Partial<Product>): Record<string, string> {
  const newErrors: Record<string, string> = {};

  if (!formData.name) newErrors.name = "Name is required";
  if (!formData.type) newErrors.type = "Type is required";
  if (!formData.barcode) newErrors.barcode = "Barcode is required";
  if (!formData.price) newErrors.price = "Price is required";
  if (!formData.supplier) newErrors.supplier = "Supplier is required";
  if (!formData.stocks?.length) newErrors.stocks = "At least one stock location is required";

  return newErrors;
}