import { ApiResponse } from "../types/model";
import { serverApi } from "../serverApi";

export interface ProductImage {
  id: number;
  url: string;
  is_primary: boolean;
}

export interface ProductVariant {
  id: number;
  price: string;        // keep string if coming as "599.00"
  discount: string;     // same here
  stock: number;
  shade: string | null;
  color: string | null;
  size: string | null;
  images: ProductImage[];
}

export interface Product {
  id: number;
  name: string;
  description: string;
  variants: ProductVariant[];

  // if these still exist in your backend response, keep them
  createdby?: number;
  isactive?: boolean;
  created_at?: string;
}


export const fetchProducts = async (): Promise<ApiResponse<Product[]>> => {
  const { data } = await serverApi.get<ApiResponse<Product[]>>("/products");
  return data;
};
