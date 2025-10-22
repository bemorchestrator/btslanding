# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Better Teaching Solutions** - Full-stack application with marketing pages and MongoDB-based CMS for blog content management. Built for Filipino teachers with admin dashboard for content creation.

- **Tech Stack**: React 18 + TypeScript + Tailwind CSS + Radix UI + Express + MongoDB (Mongoose) + JWT Auth
- **Package Manager**: pnpm
- **TypeScript**: Strict mode enabled across frontend and backend
- **Branch**: refactor-drekyz (CMS-enabled version)

## Development Commands

### Running the Application

```bash
pnpm run dev        # Full stack: frontend (3000) + backend (5000) + type-check watch
pnpm start          # Frontend only on port 3000
pnpm run server     # Backend only on port 5000
```

### Code Quality

```bash
pnpm run type-check         # TypeScript validation (single run)
pnpm run type-check:watch   # TypeScript validation (watch mode)
pnpm run lint               # ESLint check
pnpm run lint:fix           # Auto-fix linting issues
```

### Building & Testing

```bash
pnpm run build      # Production build (runs type-check + lint first via prebuild)
pnpm test           # Run test suite
```

## Architecture

### Three-Tier Application Structure

1. **Frontend Layer** (`src/`) - React SPA with public pages and admin dashboard
2. **Backend Layer** (`server/`) - Express REST API with JWT authentication
3. **Database Layer** - MongoDB Atlas with Mongoose ODM

### Frontend Architecture

**Public Pages** (`src/pages/`):
- Marketing: index.tsx, aboutus.tsx, pricing.tsx, services.tsx, contact.tsx
- Blog: blog.tsx (list), blog-detail.tsx (detail), article-preview.tsx (public view)

**Admin System** (`src/pages/admin/`):
- login.tsx: Authentication page
- dashboard.tsx: Main admin interface with four views:
  - Dashboard Overview (statistics)
  - Categories (CRUD)
  - Articles (list and management)
  - Blog Post Builder (rich content editor)

**Admin Components** (`src/components/admin/`):
- ProtectedRoute.tsx: Auth guard wrapper
- DashboardLayout.tsx: Admin shell with navigation
- BlogPostBuilder.tsx: Block-based content editor
- CategoriesView.tsx, ArticlesView.tsx: CRUD interfaces
- Built with Radix UI primitives (Dialog, AlertDialog, Tabs, Toast)

**Service Layer** (`src/services/`):
- articleService.ts: Article CRUD API client
- categoryService.ts: Category CRUD API client
- Both handle JWT tokens and auto-redirect on 401

**Global State** (`src/contexts/`):
- AuthContext.tsx: JWT authentication state
  - Stores token in localStorage as 'bts_admin_token'
  - Auto-verifies token on mount via /api/auth/verify

### Backend Architecture

**Database** ([server/config/database.ts](server/config/database.ts)):
- MongoDB connection with pooling (2-10 connections)
- Auto-reconnection on disconnect
- Requires MONGODB_URI environment variable

**Models** ([server/models/](server/models/)):
- article.ts: Blog articles with block-based content system
  - Auto-generates URL slugs from titles (guaranteed unique)
  - Two content formats: plain text and contentBlocks array
  - Status: 'draft' or 'published'
  - Indexes on slug, categoryId, status, createdAt
- category.ts: Blog categories with name, slug, description
- user.ts: In-memory admin user (username: "admin", password: "REDACTED_PASSWORD")

**API Routes** ([server/routes/](server/routes/)):
- auth.ts: POST /login, GET /verify, POST /logout
- categories.ts: Full CRUD (protected with requireAuth middleware)
- articles.ts: Full CRUD (GET public for published, write operations protected)
  - GET /api/articles/slug/:slug - Public access to published articles

**Authentication** ([server/middleware/auth.ts](server/middleware/auth.ts)):
- JWT-based with bcrypt password hashing
- requireAuth middleware verifies Bearer tokens
- Token secret from JWT_SECRET env variable

### Content Management System

**Block-Based Editor**:
Articles use a flexible content block system where each article contains an array of blocks:
- Block types: 'heading', 'paragraph', 'image', 'quote'
- Each block has content and optional styles (textAlign, fontSize, fontWeight)
- Defined in [server/models/article.ts](server/models/article.ts:12-20)

**Slug Generation**:
- Auto-generated from article title on save
- Lowercase, hyphenated, special chars removed
- Uniqueness enforced via pre-save hook (appends counter if duplicate)

**Publishing Workflow**:
1. Create article in admin → Save as 'draft'
2. Preview content in Blog Post Builder
3. Change status to 'published'
4. Article appears automatically on /blog page
5. Accessible via /articles/:slug (no authentication required)

### TypeScript Configuration

Two separate tsconfig files:
- **Root** ([tsconfig.json](tsconfig.json)): Frontend React app (JSX, baseUrl: "src", noEmit: true)
- **Server** ([server/tsconfig.json](server/tsconfig.json)): Backend API (CommonJS, outDir: "./dist")

Both enforce strict mode: noImplicitAny, noUnusedLocals, noUnusedParameters enabled.

## Environment Configuration

Create `.env.local` in the root directory:

### Required for CMS (CRITICAL)

```bash
# MongoDB Database (REQUIRED - app will not start without this)
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database

# JWT Authentication (REQUIRED for admin login)
JWT_SECRET=your_random_secret_key_here
```

### Required for Contact Form

```bash
# Email (Nodemailer SMTP)
EMAIL_USER=support@betterteachingsolutions.com
EMAIL_PASS=your_gmail_app_password
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false

# reCAPTCHA v3
REACT_APP_RECAPTCHA_SITE_KEY=your_site_key
RECAPTCHA_SECRET_KEY=your_secret_key
```

### Optional

```bash
NODE_ENV=development
PORT=5000
```

**Important**: The MongoDB connection is initialized on server startup ([server/index.ts](server/index.ts)). If MONGODB_URI is missing, the server will exit with error code 1.

reCAPTCHA setup instructions available in [CONTACT_SETUP.md](CONTACT_SETUP.md).

## Deployment Workflow

### "Get Ready for Deployment"

When preparing for deployment, run this workflow on **new changes only**:

1. Run type-check and fix all errors/warnings (use existing types, avoid creating new ones unnecessarily)
2. Run lint and fix all errors/warnings
3. Remove unused imports and variables
4. Remove all unexpected `any` types
5. Only use `unknown` for truly unpredictable data; define known types based on existing infrastructure

### Pre-deployment Validation

The build command automatically runs validation:
```bash
pnpm run build  # Runs type-check + lint before building
```

## TypeScript Configuration Notes

- **Base URL**: `src` - allows absolute imports from src directory
- **JSX Transform**: `react-jsx` - modern JSX without React imports
- **Strict Flags**: All strict checks enabled
- **Target**: ES5 for broad browser compatibility
- **Module**: ESNext with Node resolution

## Admin Dashboard Access

**URL**: http://localhost:3000/admin/login

**Default Credentials** (hardcoded in [server/models/user.ts](server/models/user.ts:10-18)):
- Username: `admin`
- Password: `REDACTED_PASSWORD`

**Admin Routes**:
- /admin/login - Authentication page
- /admin/dashboard - Overview with statistics
- /admin/categories - Manage blog categories
- /admin/articles - List and manage articles
- /admin (auto-redirects to /admin/dashboard)

## Backend API Endpoints

**Authentication**:
- POST /api/auth/login - Login with username/password, returns JWT
- GET /api/auth/verify - Verify JWT token validity
- POST /api/auth/logout - Logout (client clears token)

**Categories** (all routes require authentication):
- GET /api/categories - List all categories
- POST /api/categories - Create category
- PUT /api/categories/:id - Update category
- DELETE /api/categories/:id - Delete category

**Articles**:
- GET /api/articles - List articles (authenticated, filters by categoryId/status)
- GET /api/articles/:id - Get article by ID (authenticated)
- GET /api/articles/slug/:slug - Get published article by slug (PUBLIC, no auth)
- POST /api/articles - Create article (authenticated)
- PUT /api/articles/:id - Update article (authenticated)
- DELETE /api/articles/:id - Delete article (authenticated)

**Contact Form**:
- GET /api/health - Health check with environment status
- POST /api/contact - Contact form submission (spam protection + reCAPTCHA)

The backend runs on port 5000. Frontend proxies API requests via `package.json` proxy field.
