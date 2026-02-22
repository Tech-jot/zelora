import { fetchProducts, Product } from "../services/product";

export const getProducts = async (): Promise<Product[]> => {
  try {
    const response = await fetchProducts();
    return response.data;
  } catch (error) {
    console.error("Failed to fetch products:", error);
    return [];
  }
};
