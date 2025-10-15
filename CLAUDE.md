# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Better Teaching Solutions** - A landing page and marketing site for a SaaS platform built for Filipino teachers. Full-stack TypeScript application with React frontend and Express backend.

- **Tech Stack**: React 18 + TypeScript + Tailwind CSS + Express + Nodemailer
- **Package Manager**: pnpm
- **TypeScript**: Strict mode enabled across frontend and backend

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

### Monorepo Structure

This is a monorepo containing both frontend and backend:

- **Frontend**: `src/` - React app built with Create React App
- **Backend**: `server/` - Express API server for contact form handling
- **Shared**: `src/types/` - Shared TypeScript interfaces used across the stack

### Key Architectural Patterns

1. **Type System**
   - Shared type definitions in `src/types/blog.ts`, `src/types/components.ts`, `src/types/data.ts`
   - Modern React (React 17+ JSX transform) - no `import React` needed for JSX-only files
   - When using hooks (`useState`, `useEffect`), import them directly: `import { useState } from 'react';`
   - Strict TypeScript: `noImplicitAny`, `noUnusedLocals`, `noUnusedParameters` all enabled

2. **Backend API Structure**
   - Single Express server in `server/index.ts`
   - Handles contact form submission with spam protection
   - reCAPTCHA v3 verification
   - Nodemailer integration for email delivery
   - CSP headers configured for reCAPTCHA compatibility

3. **Frontend Routing**
   - React Router v6 for client-side routing
   - All routes defined in `src/App.tsx`
   - Catch-all route redirects to error page

4. **Styling Architecture**
   - Tailwind CSS as primary styling system
   - Material Design Icons via `materialdesignicons.min.css`
   - Custom icon exports aggregated in `src/assets/icons/vander.ts`
   - Dark mode support built into components

### Import Patterns

```typescript
// Shared data (typed)
import { blogData } from 'data/data';

// Type definitions
import { BlogItem } from 'types/blog';
import { BaseComponentProps } from 'types/components';

// Icons (all react-icons consolidated)
import { FiCheckCircle, MdKeyboardArrowRight } from 'assets/icons/vander';
```

## Contact Form Configuration

The contact form requires environment variables in `.env.local`:

### Required Variables

```bash
# Email (Nodemailer SMTP)
EMAIL_USER=support@betterteachingsolutions.com
EMAIL_PASS=your_app_password_here
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false

# reCAPTCHA v3
REACT_APP_RECAPTCHA_SITE_KEY=your_site_key
RECAPTCHA_SECRET_KEY=your_secret_key
```

### reCAPTCHA Domain Setup

reCAPTCHA keys are domain-specific. For local development:
1. Add `localhost` and `127.0.0.1` to your reCAPTCHA console domains
2. Or create separate dev keys
3. Or disable by omitting `REACT_APP_RECAPTCHA_SITE_KEY` for development mode

Full setup guide available in `CONTACT_SETUP.md`.

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

## Backend API Endpoints

- `GET /api/health` - Health check with environment status
- `POST /api/contact` - Contact form submission (includes spam protection, reCAPTCHA, rate limiting)

The backend proxies to `http://localhost:5000` in development (configured in `package.json` proxy field).
