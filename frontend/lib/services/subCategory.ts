import { serverApi } from "../serverApi";
import { ApiResponse } from "../types/model";

export interface SubCategory {
  id: number;
  name: string;
  categoryid: number;
  category_name: string;
  createdby: number;
  isactive: boolean;
  created_at: string;
}

export const fetchSubCategories = async (): Promise<
  ApiResponse<SubCategory[]>
> => {
  const { data } =
    await serverApi.get<ApiResponse<SubCategory[]>>("/subcategory");
  return data;
};
