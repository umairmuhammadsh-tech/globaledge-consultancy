const express = require('express')
const { body, validationResult } = require('express-validator')
const pool = require('../db/pool')

const router = express.Router()

/**
 * Validation rules for submitting a new application.
 */
const applicationValidation = [
  body('full_name')
    .trim()
    .notEmpty()
    .withMessage('full_name is required')
    .isLength({ max: 255 })
    .withMessage('full_name must be 255 characters or fewer'),

  body('email')
    .trim()
    .notEmpty()
    .withMessage('email is required')
    .isEmail()
    .withMessage('email must be a valid email address')
    .normalizeEmail(),

  body('phone')
    .optional()
    .trim()
    .isLength({ max: 50 })
    .withMessage('phone must be 50 characters or fewer'),

  body('country_of_interest')
    .trim()
    .notEmpty()
    .withMessage('country_of_interest is required')
    .isLength({ max: 255 })
    .withMessage('country_of_interest must be 255 characters or fewer'),

  body('service_type')
    .trim()
    .notEmpty()
    .withMessage('service_type is required')
    .isLength({ max: 255 })
    .withMessage('service_type must be 255 characters or fewer'),

  body('education_level')
    .optional()
    .trim()
    .isLength({ max: 255 })
    .withMessage('education_level must be 255 characters or fewer'),

  body('message')
    .optional()
    .trim()
    .isLength({ max: 5000 })
    .withMessage('message must be 5000 characters or fewer'),
]

/**
 * POST /api/applications
 * Submit a new student application.
 */
router.post('/', applicationValidation, async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(422).json({ success: false, errors: errors.array() })
  }

  const {
    full_name,
    email,
    phone = null,
    country_of_interest,
    service_type,
    education_level = null,
    message = null,
  } = req.body

  try {
    const result = await pool.query(
      `INSERT INTO applications
         (full_name, email, phone, country_of_interest, service_type, education_level, message)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING *`,
      [full_name, email, phone, country_of_interest, service_type, education_level, message]
    )

    return res.status(201).json({ success: true, data: result.rows[0] })
  } catch (err) {
    console.error('POST /api/applications error:', err)
    return res.status(500).json({ success: false, message: 'Internal server error' })
  }
})

/**
 * GET /api/applications
 * Retrieve all submitted applications (admin use).
 */
router.get('/', async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT * FROM applications ORDER BY created_at DESC`
    )
    return res.json({ success: true, data: result.rows, count: result.rowCount })
  } catch (err) {
    console.error('GET /api/applications error:', err)
    return res.status(500).json({ success: false, message: 'Internal server error' })
  }
})

/**
 * PATCH /api/applications/:id/status
 * Update the status of an application (admin use).
 */
router.patch(
  '/:id/status',
  [
    body('status')
      .trim()
      .notEmpty()
      .withMessage('status is required')
      .isIn(['pending', 'reviewing', 'accepted', 'rejected'])
      .withMessage('status must be one of: pending, reviewing, accepted, rejected'),
  ],
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(422).json({ success: false, errors: errors.array() })
    }

    const { id } = req.params
    const { status } = req.body

    try {
      const result = await pool.query(
        `UPDATE applications SET status = $1 WHERE id = $2 RETURNING *`,
        [status, id]
      )

      if (result.rowCount === 0) {
        return res.status(404).json({ success: false, message: 'Application not found' })
      }

      return res.json({ success: true, data: result.rows[0] })
    } catch (err) {
      console.error('PATCH /api/applications/:id/status error:', err)
      return res.status(500).json({ success: false, message: 'Internal server error' })
    }
  }
)

module.exports = router
