import { Injectable } from '@nestjs/common';
import { executeQuery } from '../common/db/execute-query';
import { CreateStudentDto } from './dto/create-student.dto';

@Injectable()
export class StudentsService {

  async create(data: CreateStudentDto) {
    const query = `
      INSERT INTO "Student" (name, email)
      VALUES ($1, $2)
      RETURNING *;
    `;

    return await executeQuery(query, [data.name, data.email]);
  }

  async findAll() {
    return await executeQuery(`SELECT * FROM "Student"`);
  }

  async findOne(id: number) {
    return await executeQuery(
      `SELECT * FROM "Student" WHERE id = $1`,
      [id]
    );
  }

  async remove(id: number) {
    return await executeQuery(
      `DELETE FROM "Student" WHERE id = $1 RETURNING *`,
      [id]
    );
  }
}