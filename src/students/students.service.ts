import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { CrudService } from '../common/services/crud.service';


@Injectable()
export class StudentsService {

  constructor(private crudService: CrudService) {}

async create(data: CreateStudentDto) {
  return this.crudService.create('student', data);
}

async findAll() {
  return this.crudService.findAll('student');
}

async findOne(id: number) {
  return this.crudService.findOne('student', id);
}

async remove(id: number) {
  return this.crudService.delete('student', id);
}

}