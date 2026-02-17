import { Constants } from "./utils/Constants";

export default function Home() {
  return (
    <div>
      <h2 className="text-3xl font-bold mb-4">{Constants.PROJECT_NAME}</h2>
      <p className="text-gray-600">
        This is a simple e-commerce customer layout using Tailwind.
      </p>
    </div>
  );
}
