var express = require("express");
var router = express.Router();
const upload = require("../middleware/upload");

const auth = require("../controllers/auth.controller");
const userController = require("../controllers/user.controller");
const categoryController = require("../controllers/category.controller");
const productController = require("../controllers/product.controller");

const typeController = require("../controllers/type.controller");
const subCategoryController = require("../controllers/subcategory.controller");
const brandController = require("../controllers/brand.controller");

const isAuthenticated = require("../middleware/auth.middleware");
const isAdmin = require("../middleware/isAdmin.middleware");
// Home
router.get("/", (req, res) => {
  res.render("index", { title: "Express" });
});

// Auth routes
router.post("/login", auth.login);
router.post("/signup", auth.signup);

//Get all users
router.get("/user", isAuthenticated, isAdmin, userController.getAllUsers);

// Brand routes
const brandRouter = express.Router();

// Brand routes
brandRouter.post("/", isAuthenticated, brandController.createBrand);
brandRouter.get("/", brandController.getBrands);
brandRouter.put("/:id", isAuthenticated, upload.single("image"), brandController.updateBrand);

// Brand routes
const productRouter = express.Router();

// Product routes
productRouter.post("/", isAuthenticated, productController.addProduct);
productRouter.get("/", productController.getProducts);

//  Create NEW router for group
const categoryRouter = express.Router();

// Category routes
categoryRouter.post("/", isAuthenticated, categoryController.createCategory);
categoryRouter.get("/", categoryController.getCategories);
// categoryRouter.get("/:id", categoryController.getCategoryById);
// categoryRouter.put("/:id", categoryController.updateCategory);
// categoryRouter.delete("/:id", categoryController.deleteCategory);

// =================================================
// TYPE GROUP
// =================================================
const typeRouter = express.Router();

typeRouter.post("/", isAuthenticated, typeController.createType);

typeRouter.get("/", typeController.getTypes);
typeRouter.get("/category", typeController.getTypesCategories);
// typeRouter.get("/:id", typeController.getTypeById);
// typeRouter.put("/:id", typeController.updateType);
// typeRouter.delete("/:id", typeController.deleteType);

// =================================================
// SUBCATEGORY GROUP
// =================================================
const subCategoryRouter = express.Router();

subCategoryRouter.post(
  "/",
  isAuthenticated,
  subCategoryController.createSubcategory,
);
subCategoryRouter.get("/", subCategoryController.getSubcategories);
// subCategoryRouter.get("/:id", subCategoryController.getSubCategoryById);
// subCategoryRouter.put("/:id", subCategoryController.updateSubCategory);
// subCategoryRouter.delete("/:id", subCategoryController.deleteSubCategory);

// Mount group
router.use("/category", categoryRouter);
router.use("/subcategory", subCategoryRouter);
router.use("/types", typeRouter);
router.use("/brand", brandRouter);
router.use("/product", productRouter);

module.exports = router;
