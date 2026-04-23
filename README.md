# Emploi Angular

Full-stack Angular + Node.js + MongoDB project for managing users, events, and participations.

## Project Structure

- `backend/` — Express API with MongoDB, JWT auth, and seed/migration script
- `event-app/` — Angular frontend

## Prerequisites

- Node.js 18+ and npm
- MongoDB running locally, or a valid MongoDB connection string

## Database Setup

The backend uses the MongoDB database named `emploi-angular` by default.

### Environment Variables

Backend `.env` file:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/emploi-angular
JWT_SECRET=ahla
```

### Run the MongoDB migration / seed

This clears the collections and inserts mock data.

```bash
cd /home/jess/ssd/dev/emploi-angular/backend
npm run migrate
```

Mock login created by the seed:

- Email: `ouneliadem@gmail.com`
- Password: `123456`

## Run the Backend

```bash
cd /home/jess/ssd/dev/emploi-angular/backend
npm install
npm start
```

Backend URL:

- `http://localhost:5000`
- API base path: `http://localhost:5000/api`

## Run the Frontend

```bash
cd /home/jess/ssd/dev/emploi-angular/event-app
npm install
npm start
```

Angular app URL:

- `http://localhost:4200`

## Main API Endpoints

### Auth

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/me`

### Users

- `GET /api/users`
- `GET /api/users/:id`
- `POST /api/users`
- `PUT /api/users/:id`
- `DELETE /api/users/:id`

### Events

- `GET /api/events`
- `POST /api/events`
- `PUT /api/events/:id`
- `DELETE /api/events/:id`

### Participations

- `GET /api/participations`
- `POST /api/participations`
- `DELETE /api/participations/:id`

## How Authentication Works

- The frontend stores the JWT token after login/register.
- An Angular HTTP interceptor sends the token automatically in the `Authorization` header.
- Protected routes redirect logged-in users away from `/auth/login` and `/auth/register`.
- Protected app routes redirect unauthenticated users to `/auth/login`.

## Useful Commands

Backend:

```bash
npm run migrate
npm start
npm run dev
```

Frontend:

```bash
npm start
npm run build
npm test
```

## Notes

- The seed script is rerunnable and resets the data before inserting mock records.
- If MongoDB is remote, update `MONGODB_URI` in `backend/.env` before running the migration.
