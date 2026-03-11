Online Learning Platform API
Overview

This project implements a RESTful backend API for an online learning platform. The API manages students, courses, and enrollments, allowing students to enroll in courses and retrieve enrollment data.

The application is built using NestJS with PostgreSQL as the database and Prisma as the ORM. It includes DTO validation and Swagger-based API documentation.

Tech Stack:-

Backend Framework
NestJS

Database
PostgreSQL

ORM
Prisma

Validation
class-validator
class-transformer

API Documentation
Swagger

Language
TypeScript

Features:-

Student Management

Create students

Retrieve all students

Retrieve a student by ID

Delete a student

Course Management

Create courses

Retrieve all courses

Enrollment Management

Enroll students into courses

Retrieve all enrollments with student and course details

API Documentation

Interactive Swagger documentation

File structure:-
src
 ├ students
 │   ├ dto
 │   ├ students.controller.ts
 │   ├ students.service.ts
 │   └ students.module.ts
 │
 ├ courses
 │   ├ dto
 │   ├ courses.controller.ts
 │   ├ courses.service.ts
 │   └ courses.module.ts
 │
 ├ enrollments
 │   ├ dto
 │   ├ enrollments.controller.ts
 │   ├ enrollments.service.ts
 │   └ enrollments.module.ts
 │
 ├ prisma
 │   ├ prisma.module.ts
 │   └ prisma.service.ts
 │
 ├ app.module.ts
 └ main.ts

prisma
 ├ schema.prisma
 └ migrations

Installation:-
git clone https://github.com/Yuvraj-singularis/Online-learning-api.git
Navigate into the project directory:-
cd Online-learning-api
Install dependencies:-
npm install

Environment Variables:-
Create a .env file in the root directory.
DATABASE_URL="postgresql://username:password@localhost:5432/online-learning-api"

Database Setup:-
Run Prisma migrations to create database tables.
npx prisma migrate dev
Generate Prisma client
npx prisma generate

Running the Application:-
Start the development server
npm run start:dev
The server will run at
http://localhost:3000

API Documentation:-
Swagger documentation is available at
http://localhost:3000/api
This interface allows testing all endpoints directly from the browser.

Database Schema:-

Student
id
name
email

Course
id
title
description

Enrollment
id
studentId
courseId

Students and courses are connected through enrollments, forming a many-to-many relationship.

Author
Yuvraj Prakash


