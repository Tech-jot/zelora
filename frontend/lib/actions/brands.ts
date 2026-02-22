import { Brand, fetchBrands } from "../services/brand";

export const getBrands = async (): Promise<Brand[]> => {
  try {
    const response = await fetchBrands();

    return response.data;
  } catch (error) {
    console.error("Failed to fetch brands:", error);
    return [];
  }
};
