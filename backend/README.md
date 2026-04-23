# Emploi Angular Backend

Express + MongoDB API for `event-app`.

## Features

- JWT auth (`/api/auth/register`, `/api/auth/login`, `/api/auth/me`)
- Events CRUD (`/api/events`)
- Users CRUD (`/api/users`)
- Participations CRUD (`/api/participations`)
- Seed script to preload frontend hardcoded data into MongoDB `emploi-angular`

## Quick Start

```bash
npm install
npm run seed
npm run start
```

## Default Seed Account

- Email: `jean.dupont@example.com`
- Password: `password123`
- Role: `admin`

## Environment

Create `.env`:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/emploi-angular
JWT_SECRET=your_secret
```
