import {
  fetchTypes,
  fetchTypesCategory,
  Types,
  TypeWithCategories,
} from "../services/types";

export const getTypes = async (): Promise<Types[]> => {
  try {
    const response = await fetchTypes();

    return response.data;
  } catch (error) {
    console.error("Failed to fetch types:", error);
    return [];
  }
};

export const getTypesCategories = async (): Promise<TypeWithCategories[]> => {
  try {
    const response = await fetchTypesCategory();

    return response.data;
  } catch (error) {
    console.error("Failed to fetch types:", error);
    return [];
  }
};
