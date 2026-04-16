/**
 * @openapi
 * components:
 *   schemas:
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: false
 *         code:
 *           type: string
 *           example: VALIDATION_ERROR
 *         message:
 *           type: string
 *           example: Invalid testimonial data
 *
 *     CreatePublicTestimonialRequest:
 *       type: object
 *       required:
 *         - title
 *         - content
 *         - authorName
 *         - type
 *       properties:
 *         title:
 *           type: string
 *           example: Great experience with the platform
 *         content:
 *           type: string
 *           example: The platform improved our workflow and made testimonial management much easier.
 *         authorName:
 *           type: string
 *           example: Jane Smith
 *         authorPosition:
 *           type: string
 *           nullable: true
 *           example: Marketing Manager
 *         authorEmail:
 *           type: string
 *           format: email
 *           nullable: true
 *           example: jane@example.com
 *         authorCompany:
 *           type: string
 *           nullable: true
 *           example: Acme Corp
 *         type:
 *           type: string
 *           enum:
 *             - TEXT
 *             - IMAGE
 *             - VIDEO
 *           example: TEXT
 *         imageUrl:
 *           type: string
 *           nullable: true
 *           example: https://cdn.example.com/testimonials/image-1.jpg
 *         videoUrl:
 *           type: string
 *           nullable: true
 *           example: https://cdn.example.com/testimonials/video-1.mp4
 *         youtubeId:
 *           type: string
 *           nullable: true
 *           example: dQw4w9WgXcQ
 *         categoryId:
 *           type: string
 *           nullable: true
 *           example: cmabc123456
 *         tagIds:
 *           type: array
 *           items:
 *             type: string
 *           example:
 *             - tag1
 *             - tag2
 *
 *     CreatePublicTestimonialResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         data:
 *           type: object
 *           properties:
 *             id:
 *               type: string
 *               example: cmabc123456
 *             message:
 *               type: string
 *               example: Your testimonial has been received and is pending review
 *
 *     UpdateTestimonialStatusRequest:
 *       type: object
 *       required:
 *         - status
 *       properties:
 *         status:
 *           type: string
 *           enum:
 *             - PENDING
 *             - DRAFT
 *             - IN_REVIEW
 *             - PUBLISHED
 *             - REJECTED
 *           example: PUBLISHED
 *         rejectionReason:
 *           type: string
 *           nullable: true
 *           example: Content does not meet editorial guidelines
 *
 *     UpdateTestimonialRequest:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *           example: Updated testimonial title
 *         content:
 *           type: string
 *           example: Updated testimonial content with enough characters.
 *         authorName:
 *           type: string
 *           example: Jane Smith
 *         authorPosition:
 *           type: string
 *           nullable: true
 *           example: Marketing Manager
 *         authorEmail:
 *           type: string
 *           format: email
 *           nullable: true
 *           example: jane@example.com
 *         authorCompany:
 *           type: string
 *           nullable: true
 *           example: Acme Corp
 *         type:
 *           type: string
 *           enum:
 *             - TEXT
 *             - IMAGE
 *             - VIDEO
 *           example: TEXT
 *         status:
 *           type: string
 *           enum:
 *             - PENDING
 *             - DRAFT
 *             - IN_REVIEW
 *             - PUBLISHED
 *             - REJECTED
 *           example: PUBLISHED
 *         imageUrl:
 *           type: string
 *           nullable: true
 *         videoUrl:
 *           type: string
 *           nullable: true
 *         youtubeId:
 *           type: string
 *           nullable: true
 *         rejectionReason:
 *           type: string
 *           nullable: true
 *         isFeatured:
 *           type: boolean
 *           example: false
 *         categoryId:
 *           type: string
 *           nullable: true
 *           example: cmabc123456
 *         tagIds:
 *           type: array
 *           items:
 *             type: string
 *           example:
 *             - tag1
 *             - tag2
 *
 *     PublicCategory:
 *       type: object
 *       nullable: true
 *       properties:
 *         id:
 *           type: string
 *           example: cmcat123456
 *         name:
 *           type: string
 *           example: Product
 *         slug:
 *           type: string
 *           example: product
 *
 *     PublicTag:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: cmtag123456
 *         name:
 *           type: string
 *           example: Productivity
 *         slug:
 *           type: string
 *           example: productivity
 *
 *     PublicTestimonialTagItem:
 *       type: object
 *       properties:
 *         tag:
 *           $ref: '#/components/schemas/PublicTag'
 *
 *     PublicTestimonial:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: cmtest123456
 *         title:
 *           type: string
 *           example: Great experience with the platform
 *         content:
 *           type: string
 *           example: The platform improved our workflow and made testimonial management much easier.
 *         authorName:
 *           type: string
 *           example: Jane Smith
 *         authorPosition:
 *           type: string
 *           nullable: true
 *           example: Marketing Manager
 *         authorCompany:
 *           type: string
 *           nullable: true
 *           example: Acme Corp
 *         type:
 *           type: string
 *           enum:
 *             - TEXT
 *             - IMAGE
 *             - VIDEO
 *         imageUrl:
 *           type: string
 *           nullable: true
 *           example: https://cdn.example.com/testimonials/image-1.jpg
 *         videoUrl:
 *           type: string
 *           nullable: true
 *           example: https://cdn.example.com/testimonials/video-1.mp4
 *         youtubeId:
 *           type: string
 *           nullable: true
 *           example: dQw4w9WgXcQ
 *         views:
 *           type: integer
 *           example: 12
 *         clicks:
 *           type: integer
 *           example: 4
 *         isFeatured:
 *           type: boolean
 *           example: true
 *         publishedAt:
 *           type: string
 *           format: date-time
 *           nullable: true
 *         createdAt:
 *           type: string
 *           format: date-time
 *         category:
 *           $ref: '#/components/schemas/PublicCategory'
 *         testimonialTags:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/PublicTestimonialTagItem'
 *
 *     PublicPublishedTestimonialsListResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         data:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/PublicTestimonial'
 *         meta:
 *           type: object
 *           properties:
 *             total:
 *               type: integer
 *               example: 25
 *             page:
 *               type: integer
 *               example: 1
 *             limit:
 *               type: integer
 *               example: 10
 *             totalPages:
 *               type: integer
 *               example: 3
 */

/**
 * @openapi
 * /api/public/testimonials:
 *   post:
 *     summary: Create a public testimonial
 *     description: Allows a visitor to submit a testimonial. The testimonial is created with pending status and must be reviewed before publication.
 *     tags:
 *       - Public Testimonials
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreatePublicTestimonialRequest'
 *           examples:
 *             textTestimonial:
 *               summary: Text testimonial example
 *               value:
 *                 title: Great experience with the platform
 *                 content: The platform improved our workflow and made testimonial management much easier.
 *                 authorName: Jane Smith
 *                 authorPosition: Marketing Manager
 *                 authorEmail: jane@example.com
 *                 authorCompany: Acme Corp
 *                 type: TEXT
 *     responses:
 *       201:
 *         description: Testimonial created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CreatePublicTestimonialResponse'
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Internal server error
 */

/**
 * @openapi
 * /api/public/testimonials/published:
 *   get:
 *     summary: List published testimonials
 *     description: Returns a paginated list of testimonials with PUBLISHED status only.
 *     tags:
 *       - Public Testimonials
 *     parameters:
 *       - in: query
 *         name: page
 *         required: false
 *         schema:
 *           type: integer
 *           default: 1
 *       - in: query
 *         name: limit
 *         required: false
 *         schema:
 *           type: integer
 *           default: 10
 *       - in: query
 *         name: categoryId
 *         required: false
 *         schema:
 *           type: string
 *       - in: query
 *         name: type
 *         required: false
 *         schema:
 *           type: string
 *           enum:
 *             - TEXT
 *             - IMAGE
 *             - VIDEO
 *       - in: query
 *         name: featured
 *         required: false
 *         schema:
 *           type: boolean
 *       - in: query
 *         name: q
 *         required: false
 *         schema:
 *           type: string
 *       - in: query
 *         name: sortBy
 *         required: false
 *         schema:
 *           type: string
 *           enum:
 *             - publishedAt
 *             - createdAt
 *             - views
 *             - clicks
 *           default: publishedAt
 *       - in: query
 *         name: sortOrder
 *         required: false
 *         schema:
 *           type: string
 *           enum:
 *             - asc
 *             - desc
 *           default: desc
 *     responses:
 *       200:
 *         description: Published testimonials retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PublicPublishedTestimonialsListResponse'
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

/**
 * @openapi
 * /api/private/testimonials:
 *   get:
 *     summary: List testimonials
 *     tags:
 *       - Testimonials
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *       - in: query
 *         name: q
 *         schema:
 *           type: string
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum:
 *             - PENDING
 *             - DRAFT
 *             - IN_REVIEW
 *             - PUBLISHED
 *             - REJECTED
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *           enum:
 *             - TEXT
 *             - IMAGE
 *             - VIDEO
 *     responses:
 *       200:
 *         description: Testimonials retrieved successfully
 */

/**
 * @openapi
 * /api/private/testimonials/{id}:
 *   get:
 *     summary: Get testimonial by id
 *     tags:
 *       - Testimonials
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Testimonial retrieved successfully
 *       404:
 *         description: Testimonial not found
 */

/**
 * @openapi
 * /api/private/testimonials/{id}/status:
 *   patch:
 *     summary: Update testimonial status
 *     tags:
 *       - Testimonials
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateTestimonialStatusRequest'
 *     responses:
 *       200:
 *         description: Testimonial status updated successfully
 *       400:
 *         description: Validation error
 *       404:
 *         description: Testimonial not found
 */

/**
 * @openapi
 * /api/private/testimonials/{id}:
 *   put:
 *     summary: Update testimonial
 *     tags:
 *       - Testimonials
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateTestimonialRequest'
 *     responses:
 *       200:
 *         description: Testimonial updated successfully
 *       400:
 *         description: Validation error
 *       404:
 *         description: Testimonial not found
 */

/**
 * @openapi
 * /api/private/testimonials/{id}:
 *   delete:
 *     summary: Delete testimonial
 *     tags:
 *       - Testimonials
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Testimonial deleted successfully
 *       404:
 *         description: Testimonial not found
 */
export { };