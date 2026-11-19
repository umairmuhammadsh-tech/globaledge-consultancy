const express = require('express')
const { body, validationResult } = require('express-validator')
const pool = require('../db/pool')

const router = express.Router()

/**
 * Validation rules for contact form submission.
 */
const contactValidation = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('name is required')
    .isLength({ max: 255 })
    .withMessage('name must be 255 characters or fewer'),

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

  body('subject')
    .optional()
    .trim()
    .isLength({ max: 255 })
    .withMessage('subject must be 255 characters or fewer'),

  body('message')
    .trim()
    .notEmpty()
    .withMessage('message is required')
    .isLength({ max: 5000 })
    .withMessage('message must be 5000 characters or fewer'),
]

/**
 * POST /api/contact
 * Submit a contact enquiry.
 */
router.post('/', contactValidation, async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(422).json({ success: false, errors: errors.array() })
  }

  const {
    name,
    email,
    phone = null,
    subject = null,
    message,
  } = req.body

  try {
    const result = await pool.query(
      `INSERT INTO contacts (name, email, phone, subject, message)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [name, email, phone, subject, message]
    )

    return res.status(201).json({ success: true, data: result.rows[0] })
  } catch (err) {
    console.error('POST /api/contact error:', err)
    return res.status(500).json({ success: false, message: 'Internal server error' })
  }
})

/**
 * GET /api/contact
 * Retrieve all contact enquiries (admin use).
 */
router.get('/', async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT * FROM contacts ORDER BY created_at DESC`
    )
    return res.json({ success: true, data: result.rows, count: result.rowCount })
  } catch (err) {
    console.error('GET /api/contact error:', err)
    return res.status(500).json({ success: false, message: 'Internal server error' })
  }
})

module.exports = router
