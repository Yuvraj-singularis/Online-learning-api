import { Injectable } from '@nestjs/common';
import { executeQuery } from '../common/db/execute-query';
import { CreateEnrollmentDto } from './dto/create-enrollment.dto';

@Injectable()
export class EnrollmentsService {

  async create(data: CreateEnrollmentDto) {
    return executeQuery(
      `INSERT INTO "Enrollment"( "studentId", "courseId")
       VALUES ($1, $2) RETURNING *`,
      [data.studentId, data.courseId]
    );
  }

  async findAll() {
    return executeQuery(`
      SELECT e.*, s.name as student_name, c.title as course_title
      FROM "Enrollment" e
      JOIN "Student" s ON e."studentId" = s.id
      JOIN "Course" c ON e."courseId" = c.id
    `);
  }
}