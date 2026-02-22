import { ApiResponse } from "../types/model";
import { serverApi } from "../serverApi";

export interface Brand {
  id: number;
  name: string;
  createdby: number;
  isactive: boolean;
  created_at: string;
}

export const fetchBrands = async (): Promise<ApiResponse<Brand[]>> => {
  const { data } = await serverApi.get<ApiResponse<Brand[]>>("/brand");
  return data;
};
