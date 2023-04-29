import { Test, TestingModule } from '@nestjs/testing';
import { CourseStudentsController } from './course-students.controller';
import { CourseStudentsService } from './course-students.service';

describe('CourseStudentsController', () => {
  let controller: CourseStudentsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CourseStudentsController],
      providers: [CourseStudentsService],
    }).compile();

    controller = module.get<CourseStudentsController>(CourseStudentsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
