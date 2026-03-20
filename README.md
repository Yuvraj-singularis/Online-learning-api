# Online Learning Platform API

A RESTful backend API for an online learning platform that manages students, courses, and enrollments. Built with **NestJS** and **PostgreSQL**, using **raw SQL** via a shared `pg` connection pool for all database operations.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Backend Framework | NestJS (TypeScript) |
| Database | PostgreSQL |
| DB Driver | `pg` (node-postgres) with connection pooling |
| Validation | `class-validator` / `class-transformer` |
| API Documentation | Swagger |

---

## Features

**Student Management**
- Create a student
- Retrieve all students
- Retrieve a student by ID
- Delete a student

**Course Management**
- Create a course
- Retrieve all courses

**Enrollment Management**
- Enroll a student into a course
- Retrieve all enrollments with full student and course details (via SQL JOIN)

**API Documentation**
- Interactive Swagger UI at `/api`

---

## File Structure

```
src/
├── common/
│   ├── db/
│   │   ├── db.config.ts         # pg Pool singleton & connection config
│   │   └── execute-query.ts     # executeQuery(sql, params) utility
│   ├── filters/                 # Global exception filters
│   ├── services/                # Shared services
│   └── common.module.ts         # Global NestJS module exposing db utility
│
├── courses/
│   ├── dto/
│   ├── courses.controller.ts
│   ├── courses.controller.spec.ts
│   ├── courses.service.ts       # Raw SQL via executeQuery
│   ├── courses.service.spec.ts
│   └── courses.module.ts
│
├── enrollments/
│   ├── dto/
│   ├── enrollments.controller.ts
│   ├── enrollments.controller.spec.ts
│   ├── enrollments.service.ts   # Raw SQL via executeQuery
│   ├── enrollments.service.spec.ts
│   └── enrollments.module.ts
│
├── students/
│   ├── dto/
│   └── ...
│
├── app.module.ts
└── main.ts

prisma/
├── schema.prisma                # DB schema reference
└── migrations/
```

---

## Database Utility — `executeQuery`

All database access goes through a single utility defined in `src/common/db/execute-query.ts`:

```typescript
executeQuery(sql: string, params?: unknown[]): Promise<QueryResult>
```

- **`sql`** — Raw SQL string using `$1`, `$2`, … placeholders
- **`params`** — Array of values safely injected for each placeholder (defaults to `[]`)

The utility acquires a client from the shared `pg` Pool configured in `db.config.ts`, executes the query, and releases the client back to the pool — even if the query throws. All placeholders are handled by `pg` as prepared statement parameters, making SQL injection impossible by design.

### Example usage (inside a service)

```typescript
// INSERT with parameters
const result = await this.executeQuery(
  `INSERT INTO students (name, email) VALUES ($1, $2) RETURNING *`,
  [dto.name, dto.email],
);

// SELECT with a JOIN (no params needed)
const result = await this.executeQuery(
  `SELECT e.id, s.name, c.title
   FROM enrollments e
   JOIN students s ON s.id = e."studentId"
   JOIN courses  c ON c.id = e."courseId"`,
);
```

---

## Installation

```bash
git clone https://github.com/Yuvraj-singularis/Online-learning-api.git
cd Online-learning-api
npm install
```

---

## Environment Variables

Create a `.env` file in the project root:

```env
DATABASE_URL="postgresql://username:password@localhost:5432/online-learning-api"
```

The `pg` Pool in `db.config.ts` reads `DATABASE_URL` on startup.

---

## Database Setup

The schema is defined in `prisma/schema.prisma` as a reference. Create the tables directly in PostgreSQL:

```sql
CREATE TABLE students (
  id    SERIAL PRIMARY KEY,
  name  TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE
);

CREATE TABLE courses (
  id          SERIAL PRIMARY KEY,
  title       TEXT NOT NULL,
  description TEXT
);

CREATE TABLE enrollments (
  id          SERIAL PRIMARY KEY,
  "studentId" INTEGER NOT NULL REFERENCES students(id),
  "courseId"  INTEGER NOT NULL REFERENCES courses(id),
  UNIQUE("studentId", "courseId")
);
```

> The `UNIQUE("studentId", "courseId")` constraint mirrors the `@@unique` defined in `schema.prisma`, preventing duplicate enrollments.

---

## Running the Application

```bash
npm run start:dev
```

Server runs at: `http://localhost:3000`

---

## API Documentation

Swagger UI is available at: `http://localhost:3000/api`

All endpoints can be tested directly from the browser.

---

## API Endpoints

### Students

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/students` | Create a student |
| `GET` | `/students` | Get all students |
| `GET` | `/students/:id` | Get a student by ID |
| `DELETE` | `/students/:id` | Delete a student |

### Courses

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/courses` | Create a course |
| `GET` | `/courses` | Get all courses |

### Enrollments

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/enrollments` | Enroll a student in a course |
| `GET` | `/enrollments` | Get all enrollments with student and course details |

---

## Database Schema

```
students          courses           enrollments
─────────────     ───────────────   ──────────────────────────────
id (PK)           id (PK)           id (PK)
name              title             studentId (FK → students)  ─┐
email             description       courseId  (FK → courses)   ─┘ UNIQUE pair
```

Students and courses are connected through enrollments, forming a many-to-many relationship. Each student–course pair is unique (no duplicate enrollments).

---

## Author

**Yuvraj Prakash**
