import { products } from "@/app/data/products";
import Image from "next/image";

export default async function ProductList({
  params,
}: {
  params: { type: string; category: string; id: string };
}) {
  const paramsData = await params;
  return (
    <div>
      {/* Header */}
      <h1 className="text-3xl font-bold mb-6 capitalize">
        {paramsData.type} / {paramsData.category}
      </h1>

      {/* Product Grid */}
      <div className="grid grid-cols-3 gap-6">
        {products.map((p) => (
          <div
            key={p.id}
            className="border rounded-xl p-4 shadow hover:shadow-lg transition bg-white"
          >
            <Image
              src="/images/product.jpg"
              alt={p.name}
              width={300}
              height={300}
              className="rounded-lg object-cover w-full h-[220px]"
            />

            <h2 className="mt-4 text-lg font-semibold">{p.name}</h2>
            <p className="text-pink-600 font-bold">{p.price}</p>

            <button className="mt-3 w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800">
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
