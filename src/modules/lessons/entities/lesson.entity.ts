import { IsNotEmpty } from "class-validator";
import { EErrors } from "src/common/enums";
import { Course } from "src/modules/course/entities/course.entity";
import { Column, Entity, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity('lessons')
export class Lesson {
    @PrimaryColumn()
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    courseId: number;
    
    @Column()
    day: number;

    @Column({ type: 'time' })
    startTime: Date;

    @Column({ type: 'time' })
    endTime: Date;
    
    @Column()
    status: number;

    @Column()
    createdDate: Date;

    @ManyToOne(() => Course, course => course.id)
    course: Course
}
