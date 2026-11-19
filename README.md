# GlobalEdge Consultancy

[![CI](https://github.com/YOUR_USERNAME/globaledge-consultancy/actions/workflows/ci.yml/badge.svg)](https://github.com/YOUR_USERNAME/globaledge-consultancy/actions/workflows/ci.yml)
[![Deploy](https://github.com/YOUR_USERNAME/globaledge-consultancy/actions/workflows/deploy.yml/badge.svg)](https://github.com/YOUR_USERNAME/globaledge-consultancy/actions/workflows/deploy.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

> **Your Gateway to World-Class Education** — A full-stack student consultancy platform helping students study abroad in the UK, USA, Canada, Australia, Germany, and New Zealand.

---

## 🚀 Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js 14 (App Router) + Tailwind CSS |
| Backend | Node.js + Express.js |
| Database | PostgreSQL 15 |
| Containerisation | Docker + Docker Compose |
| Reverse Proxy | Nginx |
| CI/CD | GitHub Actions |

---

## 📋 Prerequisites

- **Node.js** v18 or later
- **Docker Desktop** (includes Docker Compose)
- **Git**

---

## ⚡ Quick Start (Development)

```bash
# 1. Clone the repository
git clone https://github.com/YOUR_USERNAME/globaledge-consultancy.git
cd globaledge-consultancy

# 2. Copy environment template
cp .env.example .env
# Edit .env with your values if needed

# 3. Build and start all services
docker-compose up --build
```

That's it! All three services — PostgreSQL, backend, and frontend — start together.

---

## 🌐 Access URLs

| Service | URL |
|---|---|
| Frontend | <http://localhost:3000> |
| Backend API | <http://localhost:5000> |
| API Health Check | <http://localhost:5000/api/health> |
| Applications API | <http://localhost:5000/api/applications> |
| Contact API | <http://localhost:5000/api/contact> |

---

## 🛠️ Development Workflow

### Start services
```bash
docker-compose up --build
```

### Stop services
```bash
docker-compose down
```

### Stop and remove volumes (wipe database)
```bash
docker-compose down -v
```

### View logs
```bash
docker-compose logs -f backend
docker-compose logs -f frontend
```

### Rebuild a single service
```bash
docker-compose up --build backend
```

---

## 🚀 Production Deployment

### 1. Push to GitHub
```bash
git add .
git commit -m "feat: initial production release"
git push origin main
```

### 2. Configure GitHub Secrets

Go to **Settings → Secrets and variables → Actions** in your GitHub repository and add:

| Secret | Description |
|---|---|
| `DOCKER_USERNAME` | Your Docker Hub username |
| `DOCKER_PASSWORD` | Your Docker Hub password / access token |
| `SERVER_HOST` | IP address or hostname of your production server |
| `SERVER_USER` | SSH user on the production server (e.g. `ubuntu`) |
| `SERVER_SSH_KEY` | Private SSH key for the production server |

### 3. Auto-Deploy

Every push to `main` automatically:
1. Runs CI (lint, build, test)
2. Builds and pushes Docker images to Docker Hub
3. SSHs into your server and runs `docker-compose -f docker-compose.prod.yml up -d`

### 4. Manual Production Start (on server)
```bash
# On your production server
git clone https://github.com/YOUR_USERNAME/globaledge-consultancy.git
cd globaledge-consultancy
cp .env.example .env   # fill in real values
docker-compose -f docker-compose.prod.yml up -d
```

---

## 🔧 Environment Variables

| Variable | Default | Description |
|---|---|---|
| `DB_HOST` | `postgres` | PostgreSQL hostname |
| `DB_PORT` | `5432` | PostgreSQL port |
| `DB_NAME` | `globaledge` | Database name |
| `DB_USER` | `postgres` | Database user |
| `DB_PASSWORD` | `password` | Database password (**change in production!**) |
| `PORT` | `5000` | Backend server port |
| `NEXT_PUBLIC_API_URL` | `http://localhost:5000` | Backend base URL seen by the browser |
| `DOCKER_USERNAME` | — | Docker Hub username (CI/CD only) |

---

## 📁 Project Structure

```
globaledge-consultancy/
├── frontend/                   # Next.js 14 (App Router)
│   ├── src/
│   │   ├── app/
│   │   │   ├── layout.js
│   │   │   ├── page.js         # Home
│   │   │   ├── globals.css
│   │   │   ├── services/page.js
│   │   │   ├── countries/page.js
│   │   │   ├── about/page.js
│   │   │   ├── apply/page.js
│   │   │   └── contact/page.js
│   │   └── components/
│   │       ├── Navbar.js
│   │       ├── Footer.js
│   │       ├── Hero.js
│   │       ├── Services.js
│   │       ├── Countries.js
│   │       ├── Stats.js
│   │       ├── Testimonials.js
│   │       ├── WhyUs.js
│   │       └── ApplyForm.js
│   ├── Dockerfile
│   ├── next.config.js
│   ├── tailwind.config.js
│   └── package.json
│
├── backend/                    # Express.js REST API
│   ├── src/
│   │   ├── index.js
│   │   ├── routes/
│   │   │   ├── applications.js
│   │   │   ├── contact.js
│   │   │   └── health.js
│   │   ├── db/
│   │   │   └── pool.js
│   │   └── middleware/
│   │       └── cors.js
│   ├── Dockerfile
│   └── package.json
│
├── nginx/
│   └── nginx.conf              # Reverse proxy config
│
├── .github/
│   └── workflows/
│       ├── ci.yml              # Lint, build, test
│       └── deploy.yml          # Build, push, SSH deploy
│
├── docker-compose.yml          # Development
├── docker-compose.prod.yml     # Production (with Nginx)
├── .env.example                # Environment variable template
├── .gitignore
└── README.md
```

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feat/your-feature`
3. Commit your changes: `git commit -m 'feat: add your feature'`
4. Push to your branch: `git push origin feat/your-feature`
5. Open a Pull Request against `main`

Please follow [Conventional Commits](https://www.conventionalcommits.org/) for commit messages.

---

## 📄 License

This project is licensed under the **MIT License**. See [LICENSE](LICENSE) for details.
