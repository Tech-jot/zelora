import { fetchSubCategories, SubCategory } from "../services/subCategory";

export const getSubCategories = async (): Promise<SubCategory[]> => {
  try {
    const response = await fetchSubCategories();

    return response.data;
  } catch (error) {
    console.error("Failed to fetch subcategories:", error);
    return [];
  }
};
