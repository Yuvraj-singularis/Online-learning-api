import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class CrudService {

  constructor(private prisma: PrismaService) {}

  async create(model: string, data: any) {
    const prismaModel = (this.prisma as any)[model];
    return prismaModel.create({
      data: data,
    });
  }

  async findAll(model: string) {
    const prismaModel = (this.prisma as any)[model];
    return prismaModel.findMany();
  }

  async findOne(model: string, id: number) {
    const prismaModel = (this.prisma as any)[model];
    return prismaModel.findUnique({
      where: { id },
    });
  }

  async delete(model: string, id: number) {
    const prismaModel = (this.prisma as any)[model];
    return prismaModel.delete({
      where: { id },
    });
  }
}