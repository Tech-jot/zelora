export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}
export type BrandItem = {
  name: string;

  desc: string;
  products: number;
  rating: number;
  TagIcon: React.ComponentType<any>;
  image: string;
  founded?: string;
   tag?: "crown" | "fire" | "none";
};
