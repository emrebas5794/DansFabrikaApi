import { PrimaryColumn, PrimaryGeneratedColumn, Column, Entity } from "typeorm";

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
}
