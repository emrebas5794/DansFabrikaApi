import { Course } from "src/modules/course/entities/course.entity";
import { Lesson } from "src/modules/lessons/entities/lesson.entity";
import { Student } from "src/modules/student/entities/student.entity";
import { PrimaryColumn, PrimaryGeneratedColumn, Column, Entity, ManyToOne } from "typeorm";

@Entity('attendance')
export class Attendance {
    @PrimaryColumn()
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ type: 'timestamp', precision: 3 })
    attendanceDate: Date | string;

    @Column()
    courseId: number;

    @Column()
    lessonId: number;

    @Column()
    studentId: number;

    @ManyToOne(() => Lesson, (lesson) => lesson.id)
    lesson: Lesson;

    @ManyToOne(() => Course, (course) => course.id)
    course: Course;

    @ManyToOne(() => Student, (student) => student.id)
    student: Student;
}
