import { Module } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CoursesController } from './courses.controller';
import { CommonModule } from '../common/common.module';
@Module({
  providers: [CoursesService],
  imports: [CommonModule],
  controllers: [CoursesController]
})
export class CoursesModule {}
