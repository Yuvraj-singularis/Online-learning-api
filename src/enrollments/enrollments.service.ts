import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateEnrollmentDto } from './dto/create-enrollment.dto';

@Injectable()
export class EnrollmentsService {

  constructor(private prisma: PrismaService) {}

  async create(data: CreateEnrollmentDto) {
    return this.prisma.enrollment.create({
      data,
    });
  }

  async findAll() {
    return this.prisma.enrollment.findMany({
      include: {
        student: true,
        course: true,
      },
    });
  }

}