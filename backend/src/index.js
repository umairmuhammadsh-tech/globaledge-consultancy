require('dotenv').config()

const express = require('express')
const corsMiddleware = require('./middleware/cors')
const pool = require('./db/pool')

const healthRouter = require('./routes/health')
const applicationsRouter = require('./routes/applications')
const contactRouter = require('./routes/contact')

const app = express()
const PORT = process.env.PORT || 5000

// ─── Middleware ──────────────────────────────────────────────────────────────
app.use(corsMiddleware)
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true, limit: '10mb' }))

// ─── Routes ──────────────────────────────────────────────────────────────────
app.use('/api/health', healthRouter)
app.use('/api/applications', applicationsRouter)
app.use('/api/contact', contactRouter)

// ─── 404 handler ─────────────────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ success: false, message: `Route ${req.method} ${req.url} not found` })
})

// ─── Global error handler ────────────────────────────────────────────────────
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err)
  res.status(500).json({ success: false, message: err.message || 'Internal server error' })
})

// ─── Database initialisation ─────────────────────────────────────────────────
async function initDB() {
  const client = await pool.connect()
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS applications (
        id                 SERIAL PRIMARY KEY,
        full_name          VARCHAR(255) NOT NULL,
        email              VARCHAR(255) NOT NULL,
        phone              VARCHAR(50),
        country_of_interest VARCHAR(255) NOT NULL,
        service_type       VARCHAR(255) NOT NULL,
        education_level    VARCHAR(255),
        message            TEXT,
        status             VARCHAR(50) DEFAULT 'pending',
        created_at         TIMESTAMP DEFAULT NOW()
      );
    `)

    await client.query(`
      CREATE TABLE IF NOT EXISTS contacts (
        id         SERIAL PRIMARY KEY,
        name       VARCHAR(255) NOT NULL,
        email      VARCHAR(255) NOT NULL,
        phone      VARCHAR(50),
        subject    VARCHAR(255),
        message    TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT NOW()
      );
    `)

    console.log('✅ Database tables verified / created')
  } finally {
    client.release()
  }
}

// ─── Start server ─────────────────────────────────────────────────────────────
async function start() {
  try {
    await initDB()
    app.listen(PORT, () => {
      console.log(`🚀 GlobalEdge Consultancy API running on port ${PORT}`)
      console.log(`   Health: http://localhost:${PORT}/api/health`)
    })
  } catch (err) {
    console.error('❌ Failed to start server:', err)
    process.exit(1)
  }
}

start()
