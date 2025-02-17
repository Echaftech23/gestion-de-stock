import { MaterialIcons } from "@expo/vector-icons";

export const actionsItems: Array<{
  icon: keyof typeof MaterialIcons.glyphMap;
  label: string;
  route: string;
}> = [
  { icon: "add-box", label: "Add Product", route: "/scan", },
  { icon: "store", label: "Stocks", route: "/(products)/products", },
  { icon: "storefront", label: "Suppliers", route: "/(products)/products", },
  { icon: "local-shipping", label: "Shipments", route: "/(products)/products", },
  { icon: "assessment", label: "Reports", route: "/(products)/reports", },
  { icon: "help", label: "Help", route: "/(products)/products", },
];
