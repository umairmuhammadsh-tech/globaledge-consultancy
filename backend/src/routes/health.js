const express = require('express')
const router = express.Router()

/**
 * GET /api/health
 * Returns service health status.
 */
router.get('/', (req, res) => {
  res.json({
    status: 'ok',
    service: 'GlobalEdge Consultancy API',
    timestamp: new Date(),
    uptime: process.uptime(),
  })
})

module.exports = router
