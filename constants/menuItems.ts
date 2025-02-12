import { route } from "expo-router";

export const menuItems = [
  {
    title: "View Products",
    icon: "inventory",
    subtitle: "Browse available products",
    color: "bg-blue-500/20",
    route: "/(products)/index",
  },
  {
    title: "Stock Analysis",
    icon: "analytics",
    subtitle: "View detailed stock metrics",
    color: "bg-blue-500/20",
    route: "/(products)/index",
  },
  {
    title: "Inventory Reports",
    icon: "assessment",
    subtitle: "Generate inventory insights",
    color: "bg-purple-500/20",
    route: "/(products)/index",
  },
  {
    title: "Order History",
    icon: "history",
    subtitle: "Track past transactions",
    color: "bg-indigo-500/20",
    route: "/(products)/index",
  },
  {
    title: "Suppliers",
    icon: "people",
    subtitle: "Manage supplier relations",
    color: "bg-pink-500/20",
    route: "/(products)/index",
  },
];
