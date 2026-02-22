import { BrandsClient } from "@/app/(Components)/BrandClient";
import { getBrands } from "@/lib/actions/brands";
import "../../style/brandpage.css";

const groupByAlphabet = (data: any) => {
  return data.reduce((acc: any, item: any) => {
    const firstLetter = item.name?.charAt(0).toUpperCase() || "#";

    if (!acc[firstLetter]) {
      acc[firstLetter] = [];
    }

    acc[firstLetter].push({
      id: item.id,
      name: item.name,
      createdby: item.createdby,
      isactive: item.isactive,
      created_at: item.created_at,
      image: item.image,
      description: item.description,
      slug: item.slug,
      is_featured: item.is_featured,
    });

    return acc;
  }, {});
};

// ─── Main Page ────────//
export default async function BrandsPage() {
  const brandsData = await getBrands();
  const formattedData = groupByAlphabet(brandsData);

  return <BrandsClient brandsData={formattedData} />;
}
