import { Injectable } from '@nestjs/common';
import { executeQuery } from '../common/db/execute-query';
import { CreateCourseDto } from './dto/create-course.dto';

@Injectable()
export class CoursesService {

  async create(data: CreateCourseDto) {
    return executeQuery(
      `INSERT INTO "Course"(title, description)
       VALUES ($1, $2) RETURNING *`,
      [data.title, data.description]
    );
  }

  async findAll() {
    return executeQuery(`SELECT * FROM "Course"`);
  }
}