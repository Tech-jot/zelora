// ================== SIGNUP ==================

/**
 * @swagger
 * /signup:
 *   post:
 *     summary: User signup
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 example: John
 *               email:
 *                 type: string
 *                 example: john@gmail.com
 *               password:
 *                 type: string
 *                 example: 123456
 *     responses:
 *       200:
 *         description: Signup successful
 */
router.post("/signup", auth.signup);

// ================== LOGIN ==================
/**
 * @swagger
 * /login:
 *   post:
 *     summary: User login
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@gmail.com
 *               password:
 *                 type: string
 *                 example: 123456
 *     responses:
 *       200:
 *         description: Login successful
 */
router.post("/login", auth.login);

// ================== CREATE TYPE ==================
/**
 * @swagger
 * /types:
 *   post:
 *     summary: Create a new type
 *     tags: [Types]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - createdby
 *             properties:
 *               name:
 *                 type: string
 *                 example: Electronics
 *               createdby:
 *                 type: string
 *                 example: admin_id
 *     responses:
 *       200:
 *         description: Type created successfully
 *       401:
 *         description: Unauthorized
 */
typeRouter.post("/", authMiddleware, typeController.createType);

// ================== GET TYPES ==================
/**
 * @swagger
 * /types:
 *   get:
 *     summary: Get all types
 *     tags: [Types]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Types fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   name:
 *                     type: string
 *                     example: Electronics
 *                   createdby:
 *                     type: string
 *                     example: admin_id
 *       401:
 *         description: Unauthorized
 */
typeRouter.get("/", authMiddleware, typeController.getTypes);

// ================== GET category TYPES ==================

/**
 * @swagger
 * /types/category:
 *   get:
 *     summary: Get all types
 *     tags: [Types]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Types fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   name:
 *                     type: string
 *                     example: Electronics
 *                   createdby:
 *                     type: string
 *                     example: admin_id
 *       401:
 *         description: Unauthorized
 */
typeRouter.get("/", authMiddleware, typeController.getTypesCategories);

// ================== CREATE Category ==================
/**
 * @swagger
 * /category:
 *   post:
 *     summary: Create a new category
 *     tags: [Category]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - createdby
 *             properties:
 *               name:
 *                 type: string
 *                 example: Electronics
 *               typeId:
 *                 type: string
 *                 example: 1
 *               createdby:
 *                 type: string
 *                 example: admin_id
 *     responses:
 *       200:
 *         description: Category created successfully
 *       401:
 *         description: Unauthorized
 */
categoryRouter.post("/", authMiddleware, categoryController.createCategory);

// ================== Create BRANDS ==================

/**
 * @swagger
 * /brand:
 *   post:
 *     summary: Create a new brand

 *     tags: [Brand]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - createdby
 *             properties:
 *               name:
 *                 type: string
 *                 example: Dior
 * 
 *               categoryId:
 *                type: string 
 *               createdby:
 *                 type: string
 *                 example: admin_id
 *     responses:
 *       200:
 *         description: Brand created successfully
 *       401:
 *         description: Unauthorized
 */
brandRouter.post("/", authMiddleware, brandController.createBrand);

// ================== GET  Brands ==================
/**
 * @swagger
 * /brand:
 *   get:
 *     summary: Get all brands
 *     tags: [Brand]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Brands fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   name:
 *                     type: string
 *                     example: Electronics
 *                   createdby:
 *                     type: string
 *                     example: admin_id
 *       401:
 *         description: Unauthorized
 */
categoryRouter.get("/", brandController.getBrands);

// ================== UPDATE  Brands ==================


/**
 * @swagger
 * /brand/{id}:
 *   put:
 *     summary: Update Brand
 *     description: Update brand details including logo image upload
 *     tags:
 *       - Brand
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Brand ID
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               slug:
 *                 type: string
 *               description:
 *                 type: string
 *               is_featured:
 *                 type: boolean
 *               isactive:
 *                 type: boolean
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Brand updated successfully
 *       400:
 *         description: Invalid request
 *       500:
 *         description: Server error
 */

brandRouter.put("/:id", upload.single("image"), brandController.updateBrand);

// ================== GET CATEGORIES ==================
/**
 * @swagger
 * /category:
 *   get:
 *     summary: Get all categories
 *     tags: [Category]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Categories fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   name:
 *                     type: string
 *                     example: Electronics
 *                   createdby:
 *                     type: string
 *                     example: admin_id
 *       401:
 *         description: Unauthorized
 */
categoryRouter.get("/", authMiddleware, categoryController.getCategories);

// ================== CREATE Sub Category ==================
/**
 * @swagger
 * /subcategory:
 *   post:
 *     summary: Create a new subcategory

 *     tags: [Subcategory]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - createdby
 *             properties:
 *               name:
 *                 type: string
 *                 example: Electronics
 * 
 *               categoryId:
 *                type: string 
 *               createdby:
 *                 type: string
 *                 example: admin_id
 *     responses:
 *       200:
 *         description: Subcategory created successfully
 *       401:
 *         description: Unauthorized
 */
subcategoryRouter.post(
  "/",
  authMiddleware,
  subcategoryController.createSubcategory,
);

// ================== GET Sub CATEGORIES ==================
/**
 * @swagger
 * /subcategory:
 *   get:
 *     summary: Get all sub categories
 *     tags: [Subcategory]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Subcategories fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   name:
 *                     type: string
 *                     example: Electronics
 *                   createdby:
 *                     type: string
 *                     example: admin_id
 *       401:
 *         description: Unauthorized
 */
subcategoryRouter.get(
  "/",
  authMiddleware,
  subcategoryController.getSubcategories,
);

// ================== GET Sub CATEGORIES ==================
/**
 * @swagger
 * /user:
 *   get:
 *     summary: Get all users
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Users fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer

 *       401:
 *         description: Unauthorized
 */
userRouter.get(
  "/",
  authMiddleware,
  isAdminMiddleware,
  userController.getAllUsers,
);


// ================== CREATE PRODUCT ==================


/**
 * @swagger
 * /product:
 *   post:
 *     summary: Create a new product with variants and images
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               product:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 *                     example: Lakme Foundation
 *                   description:
 *                     type: string
 *                     example: Long lasting foundation
 *                   brandid:
 *                     type: integer
 *                     example: 1
 *                   subcategoryid:
 *                     type: integer
 *                     example: 2
 *               variants:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     shade:
 *                       type: string
 *                       example: Beige
 *                     color:
 *                       type: string
 *                       example: null
 *                     size:
 *                       type: string
 *                       example: null
 *                     quantity:
 *                       type: number
 *                       example: 50
 *                     unit:
 *                       type: string
 *                       example: gm
 *                     price:
 *                       type: number
 *                       example: 599
 *                     discount:
 *                       type: number
 *                       example: 10
 *                     stock:
 *                       type: integer
 *                       example: 20
 *                     sku:
 *                       type: string
 *                       example: FND-BEIGE
 *                     images:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           url:
 *                             type: string
 *                             example: beige1.jpg
 *                           is_primary:
 *                             type: boolean
 *                             example: true
 *     responses:
 *       200:
 *         description: Product created successfully
 *       401:
 *         description: Unauthorized
 */



// ================== GET PRODUCT ==================

/**
 * @swagger
 * /product:
 *   get:
 *     summary: Get all products with variants and images
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Products fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   name:
 *                     type: string
 *                     example: Lakme Foundation
 *                   description:
 *                     type: string
 *                     example: Long lasting
 *                   variants:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: integer
 *                           example: 1
 *                         shade:
 *                           type: string
 *                           example: Beige
 *                         price:
 *                           type: number
 *                           example: 599
 *                         discount:
 *                           type: number
 *                           example: 10
 *                         stock:
 *                           type: integer
 *                           example: 20
 *                         images:
 *                           type: array
 *                           items:
 *                             type: object
 *                             properties:
 *                               url:
 *                                 type: string
 *                                 example: beige1.jpg
 *                               is_primary:
 *                                 type: boolean
 *                                 example: true
 *       401:
 *         description: Unauthorized
 */
