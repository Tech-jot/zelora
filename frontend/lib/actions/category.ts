import { Category, fetchCategories } from "../services/category";

export const getCategories = async (
  typeId?: number
): Promise<Category[]> => {
  try {
    const response = await fetchCategories(typeId);

    return response.data;
  } catch (error) {
    console.error("Failed to fetch categories:", error);
    return [];
  }
};
