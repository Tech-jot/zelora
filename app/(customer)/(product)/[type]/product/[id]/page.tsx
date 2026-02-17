import Image from "next/image";
import { notFound } from "next/navigation";

async function getProduct(id: string) {
  // Fetch from DB
  return {
    id,
    name: "H&M Brown Soft Toy",
    slug: "h-m-brown-soft-toy",
    price: 1299,
  };
}

export default async function Page({
  params,
}: {
  params: { type: string; id: string };
}) {
  const product = await getProduct(params.id);

  return (
    <div>
      <div
        key={product.id}
        className="border rounded-xl p-4 shadow hover:shadow-lg transition bg-white"
      >
        <Image
          src="/images/product.jpg"
          alt={"image"}
          width={300}
          height={300}
          className="rounded-lg object-cover "
        />

        <h2 className="mt-4 text-lg font-semibold">{product.name}</h2>
        <p className="text-pink-600 font-bold">{product.price}</p>

        <button className="mt-3 w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800">
          Add to Bag
        </button>
      </div>
    </div>
  );
}
