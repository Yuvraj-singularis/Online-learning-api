import { Module } from '@nestjs/common';
import { CrudService } from './services/crud.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [CrudService],
  exports: [CrudService],
})
export class CommonModule {}