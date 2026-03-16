import { Injectable } from '@nestjs/common';
import { CrudService } from '../common/services/crud.service';
import { CreateEnrollmentDto } from './dto/create-enrollment.dto';

@Injectable()
export class EnrollmentsService {

  constructor(private crudService: CrudService) {}

  async create(data: CreateEnrollmentDto) {
    return this.crudService.create('enrollment', data);
  }

  async findAll() {
    return this.crudService.findAll('enrollment');
  }

}