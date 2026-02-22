import { ApiResponse } from "../types/model";
import { serverApi } from "../serverApi";

export interface Types {
  id: number;
  name: string;

  createdby: number;
  isactive: boolean;
  created_at: string;
}
export interface Category {
  id: number;
  name: string;
}

export interface TypeWithCategories {
  id: number;
  name: string;

  createdby?: number;
  isactive?: boolean;
  created_at?: string;

  categories: Category[];
}

export const fetchTypes = async (): Promise<ApiResponse<Types[]>> => {
  const { data } = await serverApi.get<ApiResponse<Types[]>>("/types");
  return data;
};

export const fetchTypesCategory = async (): Promise<
  ApiResponse<TypeWithCategories[]>
> => {
  const { data } =
    await serverApi.get<ApiResponse<TypeWithCategories[]>>("/types/category");
  return data;
};
