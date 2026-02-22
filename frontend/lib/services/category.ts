import { serverApi } from "../serverApi";
import { ApiResponse } from "../types/model";

export interface Category {
  id: number;
  name: string;
  typeid: number;
  type_name: string;
  createdby: number;
  isactive: boolean;
  created_at: string;
}

export const fetchCategories = async (
  typeId?: number,
): Promise<ApiResponse<Category[]>> => {
  const url = typeId ? `/category?typeId=${typeId}` : `/category`;

  const { data } = await serverApi.get<ApiResponse<Category[]>>(url);

  return data;
};
