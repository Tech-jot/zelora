// import { Constants } from "../utils/Constants";

import { Constants } from "../utils/Constants";


export default function RootFooter() {
  return (
    <footer className="bg-gray-900 text-white mt-10">
      <div className="max-w-7xl mx-auto px-4 py-8 text-center">
        <p>© 2026 {Constants.PROJECT_NAME} . All rights reserved.</p>
      </div>
    </footer>
  );
}
