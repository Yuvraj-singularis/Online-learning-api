import { Module } from '@nestjs/common';
import { EnrollmentsService } from './enrollments.service';
import { EnrollmentsController } from './enrollments.controller';
import { CommonModule } from '../common/common.module';
@Module({
  providers: [EnrollmentsService],
  imports: [CommonModule],
  controllers: [EnrollmentsController]
})
export class EnrollmentsModule {}
