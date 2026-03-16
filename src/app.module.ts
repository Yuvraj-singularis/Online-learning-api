import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StudentsModule } from './students/students.module';
import { PrismaModule } from './prisma/prisma.module';
import { CoursesModule } from './courses/courses.module';
import { EnrollmentsModule } from './enrollments/enrollments.module';
import { CrudService } from './common/services/crud.service';

@Module({
  imports: [PrismaModule, StudentsModule, CoursesModule, EnrollmentsModule],
  controllers: [AppController],
  providers: [AppService, CrudService],
})
export class AppModule {}