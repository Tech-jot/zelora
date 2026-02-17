import Link from "next/link";
import { Constants } from "../utils/Constants";
import { types } from "../data/types";

export default function RootHeader() {
  return (
    <header className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-blue-600">
          {Constants.PROJECT_NAME}
        </h1>

        <nav className="flex gap-6 text-gray-700 font-medium">
          <Link href="/">Categories</Link>
          <Link href="/">Brands</Link>
          <Link href="/products">Products</Link>
          <Link href="/cart">Cart</Link>
        </nav>
      </div>

      {/* CATEGORY TYPES BAR */}
      <div className="border-t bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 py-3 flex gap-6 overflow-x-auto">
          {types.map((cat) => (
            <Link
              key={cat.id}
              href={`/home/${cat.name}/cat/${cat.id}`} // Example URL structure
              className="whitespace-nowrap text-gray-600 hover:text-blue-600 font-medium"
            >
              {cat.name}
            </Link>
          ))}
        </div>
      </div>
    </header> 
  );
}
