# GlobalEdge Consultancy — Backend API

Node.js + Express.js REST API backed by PostgreSQL.

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Configure environment
cp .env.example .env
# Edit .env with your PostgreSQL credentials

# 3. Start development server
npm run dev

# 4. Start production server
npm start
```

## Environment Variables

| Variable        | Default     | Description                        |
|-----------------|-------------|------------------------------------|
| `PORT`          | `5000`      | HTTP port the server listens on    |
| `DB_HOST`       | `localhost` | PostgreSQL host                    |
| `DB_PORT`       | `5432`      | PostgreSQL port                    |
| `DB_NAME`       | `globaledge`| Database name                      |
| `DB_USER`       | `postgres`  | Database user                      |
| `DB_PASSWORD`   | `password`  | Database password                  |
| `FRONTEND_URL`  | `http://localhost:3000` | Allowed CORS origin      |

## API Endpoints

### Health
| Method | Path          | Description           |
|--------|---------------|-----------------------|
| GET    | `/api/health` | Service health check  |

### Applications
| Method | Path                          | Description                        |
|--------|-------------------------------|------------------------------------|
| POST   | `/api/applications`           | Submit a new student application   |
| GET    | `/api/applications`           | List all applications (admin)      |
| PATCH  | `/api/applications/:id/status`| Update application status (admin)  |

#### POST /api/applications — required fields
```json
{
  "full_name": "Jane Doe",
  "email": "jane@example.com",
  "phone": "+44 7700 900000",
  "country_of_interest": "United Kingdom",
  "service_type": "University Admissions",
  "education_level": "Undergraduate",
  "message": "I need help applying to Oxford."
}
```

### Contact
| Method | Path           | Description                    |
|--------|----------------|--------------------------------|
| POST   | `/api/contact` | Submit a contact enquiry       |
| GET    | `/api/contact` | List all enquiries (admin)     |

#### POST /api/contact — required fields
```json
{
  "name": "John Smith",
  "email": "john@example.com",
  "phone": "+1 555 0100",
  "subject": "Scholarship help",
  "message": "I would like to know more about scholarship opportunities."
}
```

## Docker

```bash
docker build -t globaledge-backend .
docker run -p 5000:5000 \
  -e DB_HOST=host.docker.internal \
  -e DB_PASSWORD=yourpassword \
  globaledge-backend
```
